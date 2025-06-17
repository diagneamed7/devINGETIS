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
        //pour l'id du match c'est un couple de l'id de l'équipe recevante et de l'équipe deplacée
        const { idEquipeRecevante, idEquipeDeplacée } = req.body;
        if (!idEquipeRecevante || !idEquipeDeplacée) {
            return res.status(400).json({ message: "Les champs idEquipeRecevante et idEquipeDeplacée sont requis." });
        }
        // Empêcher une équipe de jouer contre elle-même
        if (idEquipeRecevante === idEquipeDeplacée) {
            return res.status(400).json({ message: "Une équipe ne peut pas jouer contre elle-même." });
        }
        const newId = `${idEquipeRecevante}-${idEquipeDeplacée}`;

        // Vérifie si le match existe déjà dans ce sens
        const matchExiste = matchs.some(
            (m) => m.id === newId
        );
        if (matchExiste) {
            return res.status(400).json({ message: "Ce match existe déjà !" });
        }

        // Ajoute la date et l'heure du jour automatiquement
        const dateAujourdhui = new Date().toISOString().slice(0, 10);
        const heureAujourdhui = new Date().toISOString().slice(11, 16);

        // Charger les équipes
        const cheminRelatifEquipes = "../../db/mock-equipes.js";
        const cheminAbsoluEquipes = path.resolve(__dirname, cheminRelatifEquipes);

        let equipes;
        try {
            equipes = require(cheminAbsoluEquipes);
        } catch (err) {
            console.error("Erreur de chargement du fichier mock-equipes.js :", err);
            return res.status(500).json({ message: "Erreur de lecture du fichier des équipes." });
        }

        // Vérifier que les deux équipes existent
        const equipeRecevanteExiste = equipes.some(e => e.id === idEquipeRecevante);
        const equipeDeplaceeExiste = equipes.some(e => e.id === idEquipeDeplacée);

        if (!equipeRecevanteExiste) {
            return res.status(400).json({ message: "L'équipe recevante n'existe pas.", equipe: idEquipeRecevante });
        }
        if (!equipeDeplaceeExiste) {
            return res.status(400).json({ message: "L'équipe deplacée n'existe pas.", equipe: idEquipeDeplacée });
        }

        // Ensuite seulement, créer et ajouter le match
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