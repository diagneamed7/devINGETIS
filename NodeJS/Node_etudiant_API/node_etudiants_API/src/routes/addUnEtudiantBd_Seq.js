// src/routes/addUnEtudiantBD_Seq.js


const { Etudiant } = require('./ConnexionBD_Seq');


module.exports = (app) => {
    // Définit un endpoint POST pour ajouter un nouvel étudiant via Sequelize
    // La route est /api/etudiants_seq
    app.post('/api/etudiants', async (req, res) => {
        try {
            // Récupère les données de l'étudiant envoyées dans le corps de la requête
            const { lastname, firstname, gender, city, country } = req.body;


            // Utilise la méthode 'create' du modèle Sequelize pour insérer un nouvel enregistrement
            // Sequelize va automatiquement valider les données selon les règles définies dans le modèle (etudiant.js)
            const nouvelEtudiant = await Etudiant.create({
                lastname,
                firstname,
                gender: gender.toUpperCase(), // Convertit le genre en majuscule avant l'insertion
                city,
                country
            });


            console.log(`Étudiant ${nouvelEtudiant.firstname} ajouté avec succès (Sequelize).`);
            // Renvoie un statut 201 (Created) avec un message de succès et les données de l'étudiant créé (incluant l'ID généré)
            res.status(201).json({
                message: 'Étudiant ajouté avec succès (Sequelize) !',
                etudiant: nouvelEtudiant
            });


        } catch (error) {
            // Gère les erreurs, en particulier les erreurs de validation de Sequelize
            if (error.name === 'SequelizeValidationError') {
                // Si l'erreur est une erreur de validation (ex: champ manquant, genre incorrect),
                // on extrait les messages d'erreur et on les renvoie avec un statut 400 (Bad Request)
                const messages = error.errors.map(err => err.message);
                console.error('Erreur de validation lors de l\'ajout d\'étudiant (Sequelize) :', messages);
                return res.status(400).json({ message: 'Erreurs de validation (Sequelize) :', errors: messages });
            }
            // Pour toutes les autres erreurs (ex: problème de connexion à la DB, erreur serveur inattendue)
            console.error('Erreur lors de l\'ajout de l\'étudiant (Sequelize) :', error.message);
            res.status(500).json({ message: 'Erreur serveur lors de l\'ajout de l\'étudiant (Sequelize).' });
        }
    });
    console.log("Route '/api/etudiants_seq' (POST) chargée (Sequelize).");
};

