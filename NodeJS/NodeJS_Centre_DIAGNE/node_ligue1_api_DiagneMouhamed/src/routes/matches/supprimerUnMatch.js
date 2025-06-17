const path = require("path");
const gestionnaireFic = require("fs");

module.exports = (app) => {
  app.delete("/api/matchs/:id", (req, res) => {
    const idMatchDemande = req.params.id;
    // Chemin vers le fichier mock-matchs.js
    const cheminRelatifMock = "../../db/mock-matchs.js";
    const cheminAbsoluMock = path.resolve(__dirname, cheminRelatifMock);

    // Purge le cache require pour recharger la dernière version du fichier
    if (require.cache[cheminAbsoluMock]) {
      delete require.cache[cheminAbsoluMock];
    }

    // Charge le tableau des matchs
    let matchs;
    try {
      matchs = require(cheminAbsoluMock);
    } catch (err) {
      console.error("Erreur de chargement du fichier mock-matchs.js :", err);
      return res.status(500).json({ message: "Erreur de lecture du fichier de données." });
    }

    // Cherche l'index du match à supprimer
    const index = matchs.findIndex((match) => match.id === idMatchDemande);

    if (index === -1) {
      return res.status(404).json({ message: "Aucun match trouvé avec l'ID " + idMatchDemande });
    }

    // Supprime le match du tableau
    const matchSupprime = matchs.splice(index, 1)[0];

    // Sauvegarde le nouveau tableau dans le fichier
    const contentFinal = "module.exports = " + JSON.stringify(matchs, null, 2) + ";";
    gestionnaireFic.writeFile(cheminAbsoluMock, contentFinal, "utf8", (err) => {
      if (err) {
        console.error("Erreur d'écriture dans le fichier mock-matchs.js :", err);
        return res.status(500).json({ message: "Erreur d'enregistrement du fichier." });
      }
      res.status(200).json({ message: "Match supprimé avec succès.", match: matchSupprime });
      console.log("Match supprimé avec succès :", matchSupprime);
    });
  });
};