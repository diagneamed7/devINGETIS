const path = require("path");
const gestionnaireFic = require("fs");  


module.exports = (app) =>{
    app.get("/api/matchs/:id", (req, res) => {
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

        // Cherche le match avec l'ID correspondant
        const matchTrouve = matchs.find((match) => match.id === idMatchDemande);

        if (matchTrouve) {
            res.json(matchTrouve);
            console.log(`Le match avec l'ID ${idMatchDemande} a été trouvé.`);
        } else {
            res.status(404).send("Aucun match trouvé avec l'ID " + idMatchDemande);
            console.warn(`Aucun match trouvé pour l'ID : ${idMatchDemande}`);
        }
    });
} 