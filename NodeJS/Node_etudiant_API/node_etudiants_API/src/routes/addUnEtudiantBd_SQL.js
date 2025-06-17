//  =========================================
//  Endpoint : Ajout d'un étudiant dans la BD
//  =========================================
//  1) référence au code de conexion à la BD  comme une fonction :
const obtenirconnexionBD = require('./connexion_BD_SQL');
//  le Endpoint recoit en param : l'instance d'axpress "app"
module.exports = (app) => {
    // Endpoint pour ajouter un étudiant :
    app.post('/api/etudiants', async (req, res) => {
        //  préparer un objet pour la connexion :
        let connexion;
        //      pour se connecter à une BD : code sensible :
        //      prévoir try{} et catch{} :
        try {
            // 2) Récupération des données du corps de la requête
            //     envoyée par l'appli cliente (en Test : Insomnia)
            const { lastname, firstname, gender, city, country } = req.body;
            // 3) Validation simple des données : juste présence valeurs :
            if (!lastname || !firstname || !gender || !city || !country) {
                // 3.1) code statut 400 : erreur de l'appli cliente :
                return res.status(400).json({ message: 'toutes les infos étudiants sont obligatoires'});
            }
                //  3.2) Validation du genre (M ou F)
            if (gender.toUpperCase() !== 'M' && gender.toUpperCase() !== 'F') {
                return res.status(400).json({ message: 'Le genre doit être "M" (Masculin) ou "F" (Féminin).' });
            }
            // 4) on se connecte à la BD :
            connexion = await obtenirconnexionBD();
            // 5) ajouter un étudiant via SQL : version 1 :
            //      5.1) préprer l'instruction SQL dans une chaine :
            //          Requête SQL pour insérer un nouvel étudiant
            const requeteSQL = `
                INSERT INTO etudiants (lastname, firstname, gender, city, country)
                VALUES (?, ?, ?, ?, ?)`;
            //      5.2) j'exécute la requête en remplaçant les ? par
            //          les données envoyées par l'appli. cliente :
            const resultat = await connexion.query(requeteSQL, [lastname, firstname, gender.toUpperCase(), city, country]);
            // 6) vérification de l'ajout dans la BD :
            // Vérifier si l'insertion a réussi
            if (resultat.affectedRows === 1) {
                //  message au développeur : à envlever plus tard
                //  avant déploiement :
                console.log('Étudiant ajouté à la BD.');
                // Renvoyer id etudiant ajouté à l'appli cliente :
                res.status(201).json({ message: 'Étudiant ajouté à la BD !', id: resultat.insertIdAsNumber });
            } else {
                res.status(500).json({ message: 'Erreur \'ajout de l\'étudiant.' });
            }


        } catch (error) {
            // 7) gérer le problème côté API :
            //       pour le développeut :
            console.error('Problème \'ajout de l\'étudiant :', error.message);
            //      pour l'appli cliente :
            res.status(500).json({ message: 'Erreur API lors de l\'ajout de l\'étudiant.' });
        } finally {
            // 8) fermer la connexion à la BD
            if (connexion) {
                connexion.release();
                console.log('Connexion fremée après ajout.');
            }
        }
    });
    //  log pour savoir quel endpoint a été appellé :
    console.log("Route '/api/etudiants' (POST) chargée pour l'ajout d'étudiant.");
};


