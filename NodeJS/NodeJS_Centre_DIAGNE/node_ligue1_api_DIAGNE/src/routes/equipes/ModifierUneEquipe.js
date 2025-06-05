const chemin = require("path");
const gestionnaireFic = require("fs");

module.exports = (app) => {
  app.put("/api/equipes/:id", (req, res) => {
    const idEquipeDemande = req.params.id;

    // Chemin relatif vers le fichier mock-equipes.js
    const cheminRelatifMock = "../../db/mock-equipes.js";
    // Conversion du chemin relatif en chemin absolu grâce à __dirname
    const cheminAbsoluMock = chemin.resolve(__dirname, cheminRelatifMock);

    // On supprime le cache require pour recharger la dernière version du fichier
    if (require.cache[cheminAbsoluMock]) {
      delete require.cache[cheminAbsoluMock];
    }

    // On charge le tableau des équipes directement avec require
    let equipes;
    try {
      equipes = require(cheminAbsoluMock);
    } catch (err) {
      console.error("Erreur de chargement du fichier mock-equipes.js :", err);
      return res.status(500).json({ message: "Erreur de lecture du fichier de données." });
    }

    // On cherche l'équipe à modifier dans le tableau
    const index = equipes.findIndex(equipe => equipe.id === idEquipeDemande);

    // Si l'équipe n'existe pas, on retourne une erreur 404
    if (index === -1) {
      return res.status(404).json({
        message: "Aucune équipe trouvée avec l'ID " + idEquipeDemande,
      });
    }

    // On crée une nouvelle version de l'équipe avec les modifications reçues
    const equipeModifiee = {
      ...equipes[index],      // On garde les anciennes infos
      ...req.body,            // On écrase avec les nouvelles infos reçues
      Modified: new Date().toISOString(), // On ajoute la date de modification
    };

    // On remplace l'ancienne équipe par la nouvelle dans le tableau
    equipes[index] = equipeModifiee;

    // On prépare le contenu à écrire dans le fichier mock (format module.exports)
    const contentFinalise = "module.exports = " + JSON.stringify(equipes, null, 2) + ";";

    // On écrit le nouveau tableau dans le fichier mock-equipes.js
    gestionnaireFic.writeFile(
      cheminAbsoluMock,
      contentFinalise,
      "utf8",
      (ecritureErr) => {
        if (ecritureErr) {
          console.error("Erreur d'écriture du fichier :", ecritureErr);
          return res.status(500).send("Erreur d'écriture du fichier");
        }
        // On renvoie la réponse au client avec l'équipe modifiée
        res.status(200).json({
          message: "Équipe modifiée avec succès",
          equipe: equipeModifiee,
        });
        console.log("Équipe modifiée avec succès :", equipeModifiee);
      }
    );
  });
};
