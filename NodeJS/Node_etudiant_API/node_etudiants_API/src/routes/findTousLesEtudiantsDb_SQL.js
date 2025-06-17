// ==========================================================================
// EndPoint pour cherhcer touts les étudiants dans la base de données
// ==========================================================================



const getDBConnection = require('./connexion_BD_SQL'); // Chemin ajusté pour remonter d'un dossier


// Cette fonction prend l'application Express 'app' en paramètre
module.exports = (app) => {
    // La route est directement définie sur l'instance 'app'
    app.get('/api/etudiants', async (req, res) => {
        let connection;
        try {
            connection = await getDBConnection();
            const rows = await connection.query('SELECT * FROM etudiants');


            console.log('Données des étudiants récupérées avec succès.');
            res.status(200).json(rows);


        } catch (error) {
            console.error('Erreur lors de la récupération des étudiants :', error.message);
            res.status(500).json({ message: 'Erreur serveur lors de la récupération des étudiants.' });
        } finally {
            if (connection) {
                connection.release();
                console.log('Connexion libérée vers le pool MariaDB.');
            }
        }
    });


    console.log("Route '/etudiants' chargée."); // Ajouté pour confirmation
};


