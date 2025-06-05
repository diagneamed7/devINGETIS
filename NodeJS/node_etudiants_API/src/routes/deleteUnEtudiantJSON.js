// ==============================================
// Endpoint : Supprimer un étudiant
// ==============================================
//  1) je définis un objet pour gérer les fichiers sur le disque :
const gestionnaireFic = require("fs");
//  2) je définis un objet pour gérer les chemins des fichiers
//  sur le disque :
const chemin = require("path");

module.exports = (app) => {
  app.delete("/api/etudiants/:id", (req, res) => {
    // 1) Récupérer l'ID de l'étudiant à supprimer depuis les paramètres de l'URL
    const idEtudiantASupprimer = parseInt(req.params.id);

    // 2) Définir le chemin relatif et absolu du fichier mock-etudiants.js
    const relativeMockchemin = "../db/mock-etudiants.js";
    const mockEtudiantsChemin = chemin.resolve(__dirname, relativeMockchemin);

    // 3) Lire le contenu actuel du fichier mock-etudiants.js depuis le disque
    gestionnaireFic.readFile(
      mockEtudiantsChemin,
      "utf8",
      (lectureErr, donnees) => {
        if (lectureErr) {
          console.error(
            "Erreur lors de la lecture du fichier mock-etudiants.js :",
            lectureErr
          );
          return res
            .status(500)
            .json({
              message:
                "Erreur serveur lors de la lecture des données pour suppression.",
            });
        }
        // 3.1) charger les étudiants du fichier mock vers une collection (cache) :
        let etudiants;
        try {
          // Extraire le tableau JSON du contenu du fichier
          const correspondance = donnees.match(
            /const etudiants = (\[[\s\S]*?\]);\s*module\.exports = etudiants;/
          );
          //  correspondance est un tableau  et match() renvoie :
          //      - correspondance[0] : tout le contenu du mock avec
          //          chaines début et fin
          //       - correspondance[1] : contient que le JSON des étudiants
          //          sans les chaines début et fin :
          if (!correspondance || !correspondance[1]) {
            throw new Error(
              "Impossible d'extraire le tableau d'étudiants du fichier. Vérifiez le format."
            );
          }
          etudiants = JSON.parse(correspondance[1]);
        } catch (parseErr) {
          console.error(
            "Erreur lors du parsing du fichier mock-etudiants.js :",
            parseErr
          );
          return res
            .status(500)
            .json({ message: "Erreur de formatage du fichier de données." });
        }

        // 4) Trouver l'index de l'étudiant à supprimer dans la collection :
        const indexASupprimer = etudiants.findIndex(
          (etudiant) => etudiant.id === idEtudiantASupprimer
        );

        // 5) Vérifier si l'étudiant a été trouvé
        if (indexASupprimer === -1) {
          return res
            .status(404)
            .json({
              message: `L'étudiant avec l'ID ${idEtudiantASupprimer} n'a pas été trouvé.`,
            });
        }

        // 6) Supprimer l'étudiant du tableau en mémoire
        const etudiantSupprime = etudiants.splice(indexASupprimer, 1); // splice retourne un tableau des éléments supprimés
        console.log(
          "Étudiant supprimé de la collection en mémoire:",
          etudiantSupprime[0]
        );

        // 7) Préparer le nouveau contenu à écrire dans le fichier
        const jsonCollectionVersChaine = JSON.stringify(etudiants, null, 2);
        const contentFinalise = `const etudiants = ${jsonCollectionVersChaine};\n\nmodule.exports = etudiants;`;

        // 8) Écrire le nouveau contenu (sans l'étudiant supprimé) dans le fichier
        gestionnaireFic.writeFile(
          mockEtudiantsChemin,
          contentFinalise,
          "utf8",
          (writeErr) => {
            if (writeErr) {
              console.error(
                "Erreur lors de l'écriture dans mock-etudiants.js après suppression :",
                writeErr
              );
              return res
                .status(500)
                .json({
                  message:
                    "Erreur serveur lors de la sauvegarde après suppression.",
                });
            }
            console.log(
              "Le fichier mock-etudiants.js a été mis à jour sur le disque après suppression."
            );

            // 9) Invalider le cache de Node.js pour mock-etudiants.js
            // Cela garantit que les prochaines lectures obtiendront la version à jour.
            if (require.cache[mockEtudiantsChemin]) {
              console.log(
                "Cache purgé pour mock-etudiants.js après suppression."
              );
              delete require.cache[mockEtudiantsChemin];
            }

            const message = `L'étudiant(e) ${etudiantSupprime[0].firstname} ${etudiantSupprime[0].lastname} (ID: ${idEtudiantASupprimer}) a bien été supprimé.`;
            res.json({ message: message, data: etudiantSupprime[0] }); // Retourner l'étudiant supprimé pour confirmation
          }
        );
      }
    );
  });
};
