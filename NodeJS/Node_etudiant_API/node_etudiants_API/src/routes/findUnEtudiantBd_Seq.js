// //  =====================================
// //  Endpoint    ; rechercher un BD dans la BD
// //          version ORM : sequelize
// //  =====================================
 
// // Importe le modèle Etudiant à partir de notre configuration de connexion Sequelize
// const { Etudiant } = require('./ConnexionBD_Seq');


// module.exports = (app) => {
//     // Définit un endpoint GET pour récupérer un étudiant par son ID via Sequelize
//     // La route est /api/etudiants/:id, où :id est un paramètre dynamique
//     app.get('/api/etudiants/:id', async (req, res) => {
//         try {
//             // Récupère l'ID depuis les paramètres de l'URL
//             const etudiantId = req.params.id;


//             // Utilise la méthode 'findByPk' (Find By Primary Key) du modèle Sequelize
//             // pour récupérer un enregistrement par sa clé primaire (l'ID dans ce cas)
//             const etudiant = await Etudiant.findByPk(etudiantId);


//             // Vérifie si un étudiant a été trouvé
//             if (etudiant) {
//                 console.log(`Données de l'étudiant avec l'ID ${etudiantId} récupérées avec succès (Sequelize).`);
//                 // Renvoie l'étudiant trouvé au format JSON avec un statut 200 (OK)
//                 res.status(200).json(etudiant);
//             } else {
//                 console.log(`Aucun étudiant trouvé avec l'ID ${etudiantId}.`);
//                 // Si aucun étudiant n'est trouvé, renvoie un statut 404 (Not Found)
//                 res.status(404).json({ message: `Aucun étudiant trouvé avec l'ID ${etudiantId}.` });
//             }


//         } catch (error) {
//             // En cas d'erreur (ID invalide, problème de connexion, erreur Sequelize, etc.),
//             // on log l'erreur pour le débogage
//             console.error(`Erreur lors de la récupération de l'étudiant par ID (Sequelize) :`, error.message);
//             // Renvoie un statut 500 (Internal Server Error) à l'application cliente
//             res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'étudiant par ID (Sequelize).' });
//         }
//     });
//     // Message de confirmation au démarrage de l'application que cette route est chargée
//     console.log("Route '/api/etudiants/:id' (GET) chargée (Sequelize).");
// };

//  =====================================
//  Endpoint    ; rechercher un BD dans la BD
//          version ORM : sequelize
//  =====================================
 
// Importe le modèle Etudiant à partir de notre configuration de connexion Sequelize
const { Etudiant } = require('./ConnexionBD_Seq');


module.exports = (app) => {
    // Définit un endpoint GET pour récupérer un étudiant par son ID via Sequelize
    // La route est /api/etudiants/:id, où :id est un paramètre dynamique
    app.get('/api/etudiants/:id', async (req, res) => {
        try {
            // Récupère l'ID depuis les paramètres de l'URL
            const etudiantId = req.params.id;


            // Utilise la méthode 'findByPk' (Find By Primary Key) du modèle Sequelize
            // pour récupérer un enregistrement par sa clé primaire (l'ID dans ce cas)
            const etudiant = await Etudiant.findByPk(etudiantId);


            // Vérifie si un étudiant a été trouvé
            if (etudiant) {
                console.log(`Données de l'étudiant avec l'ID ${etudiantId} récupérées avec succès (Sequelize).`);
                // Renvoie l'étudiant trouvé au format JSON avec un statut 200 (OK)
                res.status(200).json(etudiant);
            } else {
                console.log(`Aucun étudiant trouvé avec l'ID ${etudiantId}.`);
                // Si aucun étudiant n'est trouvé, renvoie un statut 404 (Not Found)
                res.status(404).json({ message: `Aucun étudiant trouvé avec l'ID ${etudiantId}.` });
            }


        } catch (error) {
            // En cas d'erreur (ID invalide, problème de connexion, erreur Sequelize, etc.),
            // on log l'erreur pour le débogage
            console.error(`Erreur lors de la récupération de l'étudiant par ID (Sequelize) :`, error.message);
            // Renvoie un statut 500 (Internal Server Error) à l'application cliente
            res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'étudiant par ID (Sequelize).' });
        }
    });
    // Message de confirmation au démarrage de l'application que cette route est chargée
    console.log("Route '/api/etudiants/:id' (GET) chargée (Sequelize).");
};


