const path = require("path");
const gestionnaireFic = require("fs");  

module.exports = (app) => {
    app.post("/api/matchs", (req, res) => {
        const cheminRelatifMock = "../../db/mock-matchs.js";
        const cheminAbsoluMock = path.resolve(__dirname, cheminRelatifMock);

        if (require.cache[cheminAbsoluMock]) {
            delete require.cache[cheminAbsoluMock];
        }

        let matchs;
        try {
            matchs = require(cheminAbsoluMock);
        } catch (err) {
            console.error("Erreur de chargement du fichier mock-matchs.js :", err);
            return res.status(500).json({ message: "Erreur de lecture du fichier de données." });
        }

        let newId = "1";
        if (matchs.length > 0) {
            const maxId = Math.max(...matchs.map(m => parseInt(m.id, 10)));
            newId = (maxId + 1).toString();
        }

        // Ajoute la date et l'heure du jour automatiquement
        const dateAujourdhui = new Date().toISOString().slice(0, 10);
        const heureAujourdhui = new Date().toISOString().slice(11, 16);

        // Crée le nouveau match avec l'id, la date et l'heure automatiques
        const nouveauMatch = { 
            id: newId, 
            dateDuMatch: dateAujourdhui, 
            heureDuMatch: heureAujourdhui, 
            ...req.body 
        };

        matchs.push(nouveauMatch);

        const contentFinal = "module.exports = " + JSON.stringify(matchs, null, 2) + ";";
        gestionnaireFic.writeFile(cheminAbsoluMock, contentFinal, "utf8", (err) => {
            if (err) {
                console.error("Erreur d'écriture dans le fichier mock-matchs.js :", err);
                return res.status(500).json({ message: "Erreur d'enregistrement du match." });
            }
            res.status(201).json({ message: "Match ajouté avec succès.", match: nouveauMatch });
            console.log("Nouveau match ajouté avec succès.");
        });
    });
}