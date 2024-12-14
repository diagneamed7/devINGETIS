const db = require("../db"); // Importez la connexion à la base de données


//fonctionpur ajouter un produit
function addProduct(name, price) {
    return new Promise((resolve, reject) => {
        const query = "INSERT INTO  products(name,price) VALUES(?,?)";
        db.run(query, [name, price], function (err) {
            if (err) {
                return reject(err.message);
            }
            resolve({ id: this.lastID, name, price });
        });
    });
}

// Fonction pour récupérer tous les produits (READ)
function getAllProducts() {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM products", [], (err, rows) => {
            if (err) {
                return reject(err.message);
            }
            resolve(rows);
        });
    });
}
// Fonction pour mettre à jour un produit (UPDATE)
function updateProduct(id, name, price) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE products SET name = ?, price = ? WHERE id = ?`;
        db.run(query, [name, price, id], function (err) {
            if (err) {
                return reject(err.message);
            }
            resolve({ id, name, price });
        });
    });
}
// Fonction pour supprimer un produit (DELETE) 
function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM products WHERE id = ?`; db.run(query, id, function (err) {
            if (err) {
                return reject(err.message);
            }
            resolve(`Product with ID ${id} has been deleted.`);
        });
    });
}


module.exports = {
    addProduct, 
    getAllProducts,
    updateProduct,
    deleteProduct
};