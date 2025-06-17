// src/models/user.js

// Modèle Sequelize pour l'utilisateur
//utilise les types de données de Sequelize pour définir le modèle d'utilisateur
const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, // Le nom d'utilisateur doit être unique
            validate: {
                notEmpty: { msg: 'Le nom d\'utilisateur ne peut pas être vide.' },
                notNull: { msg: 'Le nom d\'utilisateur est une propriété requise.' }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true, // Le mot de passe peut être null pour l'instant, nous le hacherons plus tard
            validate: {
                // Vous pouvez ajouter des validations pour le mot de passe ici (longueur min, etc.)
            }
        }
    }, {
        timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt`
        tableName: 'users' // Nom de la table dans la base de données
    });


    return User;
};


