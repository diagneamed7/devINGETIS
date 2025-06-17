// src/models/etudiant.js

const { DataTypes } = require("sequelize");

// Ce fichier définit la structure de la table 'etudiants' pour Sequelize.
// Il map les colonnes SQL à des propriétés JavaScript.
module.exports = (sequelize) => {
  const Etudiant = sequelize.define(
    "Etudiant",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false, // Pas de valeur NULL autorisée en DB
        validate: {
          // Validations côté Sequelize avant d'envoyer à la DB
          notEmpty: { msg: "Le nom de famille ne peut pas être vide." },
          notNull: { msg: "Le nom de famille est une propriété requise." },
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le prénom ne peut pas être vide." },
          notNull: { msg: "Le prénom est une propriété requise." },
        },
      },
      gender: {
        type: DataTypes.STRING(10), // Temporairement plus grand
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le genre ne peut pas être vide." },
          notNull: { msg: "Le genre est une propriété requise." },
          isIn: {
            args: [["M", "F"]], // Gardez la validation stricte
            msg: 'Le genre doit être "M" ou "F".',
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "La ville ne peut pas être vide." },
          notNull: { msg: "La ville est une propriété requise." },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Le pays ne peut pas être vide." },
          notNull: { msg: "Le pays est une propriété requise." },
        },
      },
    },
    {
      // Options du modèle Sequelize
      timestamps: false, // Désactive les colonnes `createdAt` et `updatedAt` automatiques
      tableName: "etudiants", // Indique que ce modèle correspond à la table 'etudiants' dans la DB
    }
  );

  return Etudiant;
};
