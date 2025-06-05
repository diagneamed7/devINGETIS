// ==============================================
// Endpoint : Modifier un étudiant existant (PUT)
// ==============================================
//  1) je définis un objet pour gérer les fichiers sur le disque :
const gestionnaireFic = require("fs");
//  2) je définis un objet pour gérer les chemins des fichiers
//  sur le disque :
const chemin = require("path");

module.exports = (app) => {
  app.put("/api/etudiants/:id", (req, res) => {
    // 3) je récupère le paramètre transmis dans l'YRL :
    //      - le id de l'étudiant à modifier,
    //      - je le convertis en un entier  avec parseInt()
    const idEtudiantAModifier = parseInt(req.params.id); // Convertir l'ID en nombre entier
    // 4) je récupère les infos à modifier pour l'étudiant :
    const donneesEtudiantAModifier = req.body;
    // 5) je définis le chemin du fichier sur le disque :
    //         - chemin relatif et absolu :
    const relativeMockPath = "../db/mock-etudiants.js";
    const mockEtudiantsChemin = chemin.resolve(__dirname, relativeMockPath);
    // 6) je charge en mémoire le fichier mock en cache :
    gestionnaireFic.readFile(
      mockEtudiantsChemin,
      "utf8",
      (lectureErr, donnees) => {
        if (lectureErr) {
          console.error(
            "Problème lecture fichier mock-etudiants.js :",
            lectureErr
          );
          return res
            .status(500)
            .json({
              message: "Erreur serveur lors de la modification de l'étudiant.",
            });
        }
        // 7) on va modifier l'étudiant dans une collection (en cache)
        // 7.1) créer une collection vide :
        let etudiants;
        try {
          // 7.2) on extrait du fichier mock, les données comprise entre []
          //  grâce à une expression régulière :
          const match = donnees.match(
            /const etudiants = (\[[\s\S]*?\]);\s*module\.exports = etudiants;/
          );
          // 7.3) si on n'arrive pas extraire :
          if (!match || !match[1]) {
            throw new Error(
              "Impossible d'extraire le tableau d'étudiants du fichier. Vérifiez le format du fichier mock-etudiants.js."
            );
          }
          // 7.4) on charge les étudiants dans la collection :
          etudiants = JSON.parse(match[1]);
        } catch (parseErr) {
          console.error(
            "problème extraction données depuis mock-etudiants.js :",
            parseErr
          );
          return res
            .status(500)
            .json({
              message:
                "Erreur de formatage du fichier de données. Le contenu n'est pas un JSON valide ou ne correspond pas au format attendu (const etudiants = [...]; module.exports = etudiants;).",
            });
        }
        // 7.5) on cherche dans la collection, l'étudiant à modifier,
        // grâce à l'id passé en parma de l'URL :
        const idAModifier = etudiants.findIndex(
          (etudiant) => etudiant.id === idEtudiantAModifier
        );
        // 7.6) si l'étudiant à modifier n'est pas dans la collection :
        if (idAModifier === -1) {
          return res
            .status(404)
            .json({
              message: `L'étudiant avec l'ID ${idEtudiantAModifier} n'a pas été trouvé.`,
            });
        }
        // 7.7) on modifie l'étudiant dans la collection (en cache) :
        //  et on rajoute à la structure de cet étudiant le champ date modif
        etudiants[idAModifier] = {
          ...etudiants[idAModifier],
          ...donneesEtudiantAModifier,
          id: idEtudiantAModifier,
          updated: new Date().toISOString(), // Utiliser toISOString pour la cohérence
        };

        console.log(
          "Étudiant modifié dans la collection en mémoire:",
          etudiants[idAModifier]
        );
        // 8) on écrit toute la collection dans le fichier disque :
        // 8.1) on converit de JSON vers chaine :
        const jsonCollectionVersChaine = JSON.stringify(etudiants, null, 2);
        // 8.2) on complète la collection par une chaine au début
        //  et une chaine à la fin, pour respecter le fichier mock :
        const contentFinalise = `const etudiants = ${jsonCollectionVersChaine};\n\nmodule.exports = etudiants;`;
        // 8.3) on écrase le fic mock par la nouvelle version = avec
        //          l'étudiant modifier :
        gestionnaireFic.writeFile(
          mockEtudiantsChemin,
          contentFinalise,
          "utf8",
          (writeErr) => {
            if (writeErr) {
              console.error(
                "Erreur de récriture du mock-etudiants.js :",
                writeErr
              );
              return res
                .status(500)
                .json({
                  message:
                    "Erreur serveur lors de la sauvegarde de l'étudiant modifié.",
                });
            }
            console.log(
              "Le fichier mock-etudiants.js a été mis à jour sur le disque avec l'étudiant modifié."
            );
            // 8.4) on supprime le cache pour que les prochaines
            // requêtes rechargent le fichier depuis le disk :
            if (require.cache[mockEtudiantsChemin]) {
              console.log(
                "Cache purgé pour mock-etudiants.js après modification."
              );
              delete require.cache[mockEtudiantsChemin];
            }

            const message = `L'étudiant(e) avec l'id ${idEtudiantAModifier} a bien été modifié.`;
            res.json({ message: message, data: etudiants[idAModifier] });
          }
        );
      }
    );
  });
};
