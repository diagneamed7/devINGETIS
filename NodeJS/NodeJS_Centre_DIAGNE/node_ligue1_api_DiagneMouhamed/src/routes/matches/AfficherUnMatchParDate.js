const path = require("path");
const gestionnaireFic = require("fs");

module.exports = (app) => {
    app.get("/api/matchs/date/:date", (req, res) => {
        const dateDemande = req.params.date;

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

        // Filtre les matchs par date
        const matchsParDate = matchs.filter(match => match.dateDuMatch === dateDemande);

        if (matchsParDate.length > 0) {
            res.json(matchsParDate);
            console.log(`Matchs trouvés pour la date ${dateDemande}.`);
        } else {
            res.status(404).send("Aucun match trouvé pour la date " + dateDemande);
            console.warn(`Aucun match trouvé pour la date : ${dateDemande}`);
        }
    });
}