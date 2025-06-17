// src/routes/connexionBD_Seq.js


const { Sequelize } = require('sequelize');
const defineEtudiantModel = require('../models/etudiant');

// on vas utiliser la table sql User

const defineUserModel = require('../models/user'); // Importez le nouveau modèle User


// Initialisation de Sequelize
const sequelize = new Sequelize('dbUniversite', 'root', '', { // N'oubliez pas votre mot de passe ici
    host: 'localhost',
    dialect: 'mariadb',
    logging: false, // Désactive les logs SQL dans la console (mettez true pour déboguer)
    dialectOptions: {
        decimalNumbers: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


// Définition des modèles dans l'instance Sequelize
const Etudiant = defineEtudiantModel(sequelize);

// ci dessous user vas servir a interagir avec DB
const User = defineUserModel(sequelize); // Définissez le modèle User


// Synchronisation des modèles avec la base de données
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de données synchronisée avec les modèles Sequelize.');
        // Vérifier et créer l'utilisateur 'admin' si n'existe pas
        User.findOrCreate({
            where: { username: 'admin' },
            defaults: {
                password: null // Pas de mot de passe pour l'instant, comme demandé
            }
        })
        .then(([user, created]) => {
            if (created) {
                console.log('Utilisateur "admin" créé avec succès.');
            } else {
                console.log('Utilisateur "admin" existe déjà.');
            }
        })
        .catch(err => {
            console.error('Erreur lors de la vérification/création de l\'utilisateur "admin" :', err);
        });
    })
    .catch(err => {
        console.error('Erreur de synchronisation de la base de données (Sequelize) :', err);
    });


// Test de connexion
async function testDBConnectionSeq() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données dbUniversite (via Sequelize) réussie.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données via Sequelize :', error);
    }
}


testDBConnectionSeq(); // Appelle la fonction pour tester la connexion au démarrage


// Exportation de l'instance Sequelize et des modèles
module.exports = {
    sequelize,
    Etudiant,
    User // Exportez le modèle User
};





/*
// src/routes/connexionBD_Seq.js


const { Sequelize } = require('sequelize');
const defineEtudiantModel = require('../models/etudiant'); // Le chemin vers le modèle


// Initialisation de Sequelize
const sequelize = new Sequelize('dbUniversite', 'root', '', { // N'oubliez pas votre mot de passe ici
    host: 'localhost',
    dialect: 'mariadb',
    logging: false, // Désactive les logs SQL dans la console (mettez true pour déboguer)
    dialectOptions: {
        decimalNumbers: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});


// Définition du modèle dans l'instance Sequelize
const Etudiant = defineEtudiantModel(sequelize);


// Synchronisation des modèles avec la base de données
// 'alter: true' essaiera de modifier la table pour qu'elle corresponde au modèle
// sans supprimer les données existantes.
// Attention : en production, utilisez des migrations Sequelize pour gérer les changements de schéma de manière contrôlée.
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Base de données synchronisée avec les modèles Sequelize.');
    })
    .catch(err => {
        console.error('Erreur de synchronisation de la base de données (Sequelize) :', err);
    });


// Test de connexion
async function testDBConnectionSeq() {
    try {
        await sequelize.authenticate();
        console.log('Connexion à la base de données dbUniversite (via Sequelize) réussie.');
    } catch (error) {
        console.error('Impossible de se connecter à la base de données via Sequelize :', error);
    }
}


testDBConnectionSeq(); // Appelle la fonction pour tester la connexion au démarrage


// Exportation de l'instance Sequelize et du modèle Etudiant
module.exports = {
    sequelize,
    Etudiant
};  */


