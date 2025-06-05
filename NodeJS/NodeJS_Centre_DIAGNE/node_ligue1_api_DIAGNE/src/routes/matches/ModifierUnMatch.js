const path = require("path");
const gestionnaireFic = require("fs");

module.exports = (app) => {
  app.put("/api/matchs/:id", (req, res) => {
    const idMatchDemande = req.params.id;
    // Chemin relatif vers le fichier mock-matchs.js
    const cheminRelatifMock = "../../db/mock-matchs.js";
    const cheminAbsoluMock = path.resolve(__dirname, cheminRelatifMock);

    // On supprime le cache require pour recharger la dernière version du fichier
    if (require.cache[cheminAbsoluMock]) {
      delete require.cache[cheminAbsoluMock];
    }
    // On charge directement les matchs avec require
    let matchs;
    try {
      matchs = require(cheminAbsoluMock);
    } catch (err) {
      console.error("Erreur de chargement du fichier mock-matchs.js :", err);
      return res
        .status(500)
        .json({ message: "Erreur de lecture du fichier de données." });
    }
    // On cherche le match à modifier dans le tableau
    const index = matchs.findIndex((match) => match.id === idMatchDemande);

    // Si le match n'existe pas, on retourne une erreur 404
    if (index === -1) {
      return res.status(404).json({
        message: "Aucun match trouvé avec l'ID " + idMatchDemande,
      });
    }
    // On crée une nouvelle version du match avec les modifications reçues
    const matchModifiee = {
      ...matchs[index], // On garde les anciennes infos
      ...req.body, // On écrase avec les nouvelles infos reçues
      Modified: new Date().toISOString(), // On ajoute la date de modification
    };
    // On remplace l'ancien match par le nouveau dans le tableau
    matchs[index] = matchModifiee;

    // On prépare le contenu à écrire dans le fichier mock (format module.exports)
    const contentFinalise =
      "module.exports = " + JSON.stringify(matchs, null, 2) + ";";

    // On écrit le nouveau tableau dans le fichier mock-matchs.js
    gestionnaireFic.writeFile(
      cheminAbsoluMock,
      contentFinalise,
      "utf8",
      (ecritureErr) => {
        if (ecritureErr) {
          console.error("Erreur d'écriture du fichier :", ecritureErr);
          return res.status(500).send("Erreur d'écriture du fichier");
        }
        res.status(200).json({
          message: "Match modifié avec succès",
          match: matchModifiee,
        });
        console.log("Match modifié avec succès :", matchModifiee);
      }
    );
  });
};
