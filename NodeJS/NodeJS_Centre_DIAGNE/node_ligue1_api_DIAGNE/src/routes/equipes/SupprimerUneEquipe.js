const path = require("path");
const gestionnaireFic = require("fs");

module.exports = (app) => {
    app.delete("/api/equipes/:id", (req, res) => {
        const idEquipeDemande = req.params.id;

        // Chemin vers le fichier mock-equipes.js
        const cheminRelatifMock = "../../db/mock-equipes.js";
        const cheminAbsoluMock = path.resolve(__dirname, cheminRelatifMock);

        // Purge le cache require pour recharger la dernière version du fichier
        if (require.cache[cheminAbsoluMock]) {
            delete require.cache[cheminAbsoluMock];
        }

        // Charge le tableau des équipes
        let equipes;
        try {
            equipes = require(cheminAbsoluMock);
        } catch (err) {
            console.error("Erreur de chargement du fichier mock-equipes.js :", err);
            return res.status(500).json({ message: "Erreur de lecture du fichier de données." });
        }

        // Cherche l'équipe à supprimer
        const index = equipes.findIndex(equipe => equipe.id === idEquipeDemande);

        if (index === -1) {
            return res.status(404).json({
                message: "Aucune équipe trouvée avec l'ID " + idEquipeDemande,
            });
        }

        // Supprime l'équipe du tableau
        equipes.splice(index, 1);

        // Sauvegarde le nouveau tableau d'équipes
        const contentEquipes = "module.exports = " + JSON.stringify(equipes, null, 2) + ";";
        gestionnaireFic.writeFileSync(cheminAbsoluMock, contentEquipes, "utf8");

        // === SUPPRESSION DES MATCHS DE L'ÉQUIPE ===
        // Chemin vers le fichier mock-matchs.js
        const cheminRelatifMatchs = "../../db/mock-matchs.js";
        const cheminAbsoluMatchs = path.resolve(__dirname, cheminRelatifMatchs);

        // Purge le cache require pour les matchs
        if (require.cache[cheminAbsoluMatchs]) {
            delete require.cache[cheminAbsoluMatchs];
        }

        // Charge le tableau des matchs
        let matchs;
        try {
            matchs = require(cheminAbsoluMatchs);
        } catch (err) {
            console.error("Erreur de chargement du fichier mock-matchs.js :", err);
            return res.status(500).json({ message: "Erreur de lecture du fichier de matchs." });
        }

        // Filtre les matchs pour supprimer ceux où l'équipe supprimée apparaît
        const nouveauxMatchs = matchs.filter(
            match =>
                match.idEquipeRecevante !== idEquipeDemande &&
                match.idEquipeDeplacée !== idEquipeDemande
        );

        // Sauvegarde le nouveau tableau de matchs
        const contentMatchs = "module.exports = " + JSON.stringify(nouveauxMatchs, null, 2) + ";";
        gestionnaireFic.writeFileSync(cheminAbsoluMatchs, contentMatchs, "utf8");

        // Réponse finale
        res.status(200).json({ message: "Équipe et ses matchs supprimés avec succès" });
    });
};