const express = require('express');
 const router = express.Router();
const { addProduct, getAllProducts, updateProduct, deleteProduct } = require('../Controllers/products');


// Route pour ajouter un produit
router.post('/', async (req, res) => {
    const { name, price } = req.body;
    try {
        const product = await addProduct(name, price); 
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

router.get('/new', (req, res) => {
    res.render('newProduct');  // Affiche un formulaire pour ajouter un produit
});
// Route pour récupérer tous les produits
router.get('/', async (req, res) => {
    try {
        const products = await getAllProducts();
         res.status(200).render('products', { products });
    } catch (err) {
        res.status(500).json({ error: err });
    }
});
// Route pour mettre à jour un produit 
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body; try {
        const product = await updateProduct(id, name, price);
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});
// Route pour supprimer un produit 
router.delete('/:id', async (req, res) => {
    const { id } = req.params; try {
        const message = await deleteProduct(id);
        res.status(200).json({ message });
    } catch (err) {
        res.status(400).json({ error: err });
    }
});
module.exports = router;