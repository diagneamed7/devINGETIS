// updateUnEtudiantBD_ORM.js


const { Etudiant } = require('./ConnexionBD_Seq'); // Votre modèle Etudiant
const authMiddleware = require('../auth/auth'); // <--- C'est ici que vous importez le middleware


// ... d'autres imports nécessaires pour votre logique de mise à jour ...


module.exports = (app) => {
    // La route de mise à jour d'un étudiant
    app.put('/api/etudiants/:id', authMiddleware, (req, res) => { // <--- Ajoutez authMiddleware ici
        const id = req.params.id;
        const etudiantProps = req.body; // Les données envoyées pour la mise à jour


        Etudiant.update(etudiantProps, {
                where: { id: id }
            })
            .then(([nombreDeLignesAffectees]) => {
                if (nombreDeLignesAffectees === 0) {
                    const message = `L'étudiant avec l'ID ${id} n'a pas été trouvé.`;
                    return res.status(404).json({ message });
                }
                return Etudiant.findByPk(id)
                    .then(etudiant => {
                        if (etudiant === null) {
                            const message = `L'étudiant demandé n'existe pas. Réessayez avec un autre identifiant.`;
                            return res.status(404).json({ message });
                        }
                        const message = `L'étudiant ${etudiant.nom} a été mis à jour avec succès.`;
                        res.json({ message, data: etudiant });
                    });
            })
            .catch(error => {
                console.error("Erreur lors de la mise à jour de l'étudiant :", error);
                const message = `L'étudiant n'a pas pu être mis à jour. Réessayez dans quelques instants.`;
                res.status(500).json({ message, error: error.message });
            });
    });
};




























//============================================================
// src/routes/updateUnEtudiantBD_Seq.js


// const { Etudiant } = require('./ConnexionBD_Seq');
// //const authMiddleware = require('./src/auth/auth');

// module.exports = (app) => {
//     // Définit un endpoint PUT pour modifier un étudiant existant via Sequelize
//     // La route est /api/etudiants_seq/:id, où :id est l'ID de l'étudiant à modifier
//     // La méthode PUT exige que toutes les propriétés de la ressource soient fournies.
//     app.put('/api/etudiants/:id', async (req, res) => {
//         try {
//             // Récupère l'ID de l'étudiant depuis les paramètres de l'URL
//             const idEtudiant = req.params.id;
//             // Récupère toutes les données de l'étudiant à partir du corps de la requête
//             const { lastname, firstname, gender, city, country } = req.body;



//             // Validation explicite pour PUT : tous les champs doivent être présents dans le corps de la requête
//             if (!lastname || !firstname || !gender || !city || !country) {
//                 return res.status(400).json({ message: 'Pour une mise à jour PUT (Sequelize), tous les champs (lastname, firstname, gender, city, country) sont obligatoires.' });
//             }



//             // Utilise la méthode 'update' du modèle Sequelize pour mettre à jour l'enregistrement
//             // Le premier argument est un objet contenant les nouvelles valeurs.
//             // Le second argument est un objet 'where' qui spécifie la condition de mise à jour (ici, par ID).
//             const [affectedRows] = await Etudiant.update({
//                 lastname,
//                 firstname,
//                 gender: gender.toUpperCase(), // Convertit le genre en majuscule
//                 city,
//                 country
//             }, {
//                 where: { id: idEtudiant }
//             });

            
//             // Vérifie si des lignes ont été affectées par la mise à jour
//             if (affectedRows === 0) {
//                 // Si aucune ligne n'a été affectée, cela signifie que l'étudiant avec l'ID donné n'a pas été trouvé
//                 // ou que les données fournies étaient identiques aux données existantes (pas de changement effectif).
//                 // On renvoie un statut 404 (Not Found).
//                 return res.status(404).json({ message: `Aucun étudiant trouvé avec l'ID ${idEtudiant} pour la mise à jour (Sequelize).` });
//             }



//             // Après la mise à jour, il est courant de renvoyer l'objet complet mis à jour.
//             // On le récupère en utilisant 'findByPk' (find by Primary Key).
//             const etudiantMisAJour = await Etudiant.findByPk(idEtudiant);



//             console.log(`Étudiant avec l'ID ${idEtudiant} mis à jour avec succès (Sequelize).`);
//             // Renvoie un statut 200 (OK) avec un message de succès et l'objet étudiant mis à jour
//             res.status(200).json({
//                 message: `Étudiant avec l'ID ${idEtudiant} mis à jour avec succès (Sequelize).`,
//                 etudiant: etudiantMisAJour
//             });


//         } catch (error) {
//             // Gère les erreurs de validation Sequelize ou d'autres erreurs serveur
//             if (error.name === 'SequelizeValidationError') {
//                 // Si c'est une erreur de validation du modèle, on extrait les messages et renvoie un 400.
//                 const messages = error.errors.map(err => err.message);
//                 console.error('Erreur de validation lors de la mise à jour d\'étudiant (Sequelize) :', messages);
//                 return res.status(400).json({ message: 'Erreurs de validation (Sequelize) :', errors: messages });
//             }
//             // Pour toute autre erreur inattendue
//             console.error(`Erreur lors de la mise à jour de l'étudiant avec l'ID ${req.params.id} (Sequelize) :`, error.message);
//             res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'étudiant (Sequelize).' });
//         }
//     });
//     console.log("Route '/api/etudiants_seq/:id' (PUT) chargée (Sequelize).");
// };
