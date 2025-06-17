const path = require("path");
const gestionnaireFic = require("fs");

module.exports = (app) => {
    app.get("/api/matchs", (req,res)=>{
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

        // Envoie la réponse avec le nombre de matchs et les détails
        const message = "Il y a " + matchs.length + " matchs dans la ligue 1";
        res.status(200).json({ message: message, matchs: matchs });
    })
}