// connexionBD.js


const driverMariaD = require('mariadb'); // Importe le driver MariaDB


// Configuration de la connexion à la base de données
// Utilise un pool de connexions pour de meilleures performances en production
const pool = driverMariaD.createPool({
    host: 'localhost',   // Ou l'adresse de ton serveur MariaDB
    user: 'root',        // Ton nom d'utilisateur MariaDB
    password: '', // !!! REMPLACE PAR TON MOT DE PASSE MARIA_DB !!!
    database: 'dbUniversite',
    connectionLimit: 5, // Nombre maximum de connexions dans le pool
    bigIntAsNumber: true  // mariadb renvoie le id en BigInt natif de JS
                          // or ce type n'est pas sérialisable
});


// Fonction asynchrone pour obtenir une connexion du pool
async function getDBConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('Connecté à la base de données dbUniversite (via pool MariaDB).');
        return connection;
    } catch (err) {
        console.error('Erreur de connexion au pool MariaDB :', err.message);
        throw err; // Propage l'erreur
    }
}


module.exports = getDBConnection; // Exporte la fonction de connexion