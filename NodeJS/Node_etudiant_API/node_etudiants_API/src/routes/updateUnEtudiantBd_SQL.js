//  ============================================
//  Endpoint : modifier un étudiant dans la BD :
//  ============================================
//  1) référence au code de conexion à la BD  comme une fonction :
const obtenirconnexionBD = require('./connexion_BD_SQL');


module.exports = (app) => {
    // Endpoint pour modifier un étudiant par son ID avec la méthode PUT
    app.put('/api/etudiants/:id', async (req, res) => {
         //  préparer un objet pour la connexion :
        let connexion;
        try {
            // 1. Récupérer l'ID de l'étudiant depuis les paramètres de l'URL
            const idEtudiant = req.params.id;


            // 2. Récupérer TOUTES les données de l'étudiant depuis le corps de la requête
            //    Pour PUT, TOUS les champs sont obligatoires
            const { lastname, firstname, gender, city, country } = req.body;


            // 3. Validation de la présence de TOUS les champs
            if (!lastname || !firstname || !gender || !city || !country) {
                return res.status(400).json({ message: 'Pour une mise à jour PUT, tous les champs (lastname, firstname, gender, city, country) sont obligatoires.' });
            }


            // 4. Validation du genre (M ou F)
            if (gender.toUpperCase() !== 'M' && gender.toUpperCase() !== 'F') {
                return res.status(400).json({ message: 'Le genre doit être "M" (Masculin) ou "F" (Féminin).' });
            }


            // 5. Se connecter à la BD
            connexion = await obtenirconnexionBD();


            // 6. Construire et exécuter la requête SQL UPDATE
            //    La requête est statique car tous les champs sont toujours présents
            const requeteSQL = `
                UPDATE etudiants
                SET lastname = ?, firstname = ?, gender = ?, city = ?, country = ?
                WHERE id = ?`;
           
            const valeursAModifier = [
                lastname,
                firstname,
                gender.toUpperCase(),
                city,
                country,
                idEtudiant // L'ID est toujours le dernier paramètre pour le WHERE clause
            ];


            const resultat = await connexion.query(requeteSQL, valeursAModifier);


            // 7. Gérer le résultat de la mise à jour
            if (resultat.affectedRows === 0) {
                // Si aucune ligne n'a été affectée, cela signifie que l'étudiant n'a pas été trouvé
                return res.status(404).json({ message: `Aucun étudiant trouvé avec l'ID ${idEtudiant}.` });
            }


            console.log(`Étudiant avec l'ID ${idEtudiant} entièrement mis à jour dans la BD.`);
            res.status(200).json({ message: `Étudiant avec l'ID ${idEtudiant} mis à jour avec succès.`, id: idEtudiant });


        } catch (error) {
            console.error(`Problème lors de la mise à jour PUT de l'étudiant avec l'ID ${req.params.id} :`, error.message);
            res.status(500).json({ message: 'Erreur API lors de la mise à jour de l\'étudiant.' });
        } finally {
            if (connexion) {
                connexion.release();
                console.log('Connexion fermée après mise à jour PUT.');
            }
        }
    });


    console.log("Route '/api/etudiants/:id' (PUT) chargée pour la mise à jour complète d'étudiant.");
};


