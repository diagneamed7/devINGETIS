// src/routes/deleteUnEtudiantBD_Seq.js


const { Etudiant } = require('./ConnexionBD_Seq');


module.exports = (app) => {
    // Définit un endpoint DELETE pour supprimer un étudiant via Sequelize
    // La route est /api/etudiants_seq/:id, où :id est l'ID de l'étudiant à supprimer
    app.delete('/api/etudiants/:id', async (req, res) => {
        try {
            // Récupère l'ID de l'étudiant à supprimer depuis les paramètres de l'URL
            const idEtudiant = req.params.id;


            // Utilise la méthode 'destroy' du modèle Sequelize pour supprimer l'enregistrement
            // Le 'where' est utilisé pour spécifier la condition de suppression (ici, par ID).
            const affectedRows = await Etudiant.destroy({
                where: { id: idEtudiant }
            });


            // Vérifie si des lignes ont été affectées par la suppression
            if (affectedRows === 0) {
                // Si aucune ligne n'a été affectée, l'étudiant avec l'ID donné n'a pas été trouvé.
                // On renvoie un statut 404 (Not Found).
                return res.status(404).json({ message: `Aucun étudiant trouvé avec l'ID ${idEtudiant} pour la suppression (Sequelize).` });
            }


            console.log(`Étudiant avec l'ID ${idEtudiant} supprimé avec succès (Sequelize).`);
            // Renvoie un statut 200 (OK) avec un message de succès et l'ID de l'étudiant supprimé
            res.status(200).json({ message: `Étudiant avec l'ID ${idEtudiant} supprimé avec succès (Sequelize).`, id: idEtudiant });


        } catch (error) {
            // Gère toutes les erreurs potentielles survenues pendant le processus de suppression
            console.error(`Erreur lors de la suppression de l'étudiant avec l'ID ${req.params.id} (Sequelize) :`, error.message);
            // Renvoie un statut 500 (Internal Server Error) à l'application cliente
            res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'étudiant (Sequelize).' });
        }
    });
    console.log("Route '/api/etudiants_seq/:id' (DELETE) chargée (Sequelize).");
};

