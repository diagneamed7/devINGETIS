// db.js
const sqlite3 = require("sqlite3").verbose();
// Connexion à la base de données SQLite (mémoire ou fichier)
const db = new sqlite3.Database(":memory:", (err) => {
  if (err) {
    console.error("Error opening database " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});
// Création de la table produits si elle n'existe pas encore
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS products (
id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
price REAL NOT NULL
)`);
});
module.exports = db;
