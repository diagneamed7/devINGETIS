// routes/categoryRoutes.js
const CategoryService = require('../services/CategoryService');
const CategoryController = require('../controllers/CategoryController');
const express = require('express');
const router = express.Router();

// Exemple de route pour afficher toutes les catégories
router.get('/', async (req, res) => {
    const categories = await CategoryService.getAllCategories();
    res.render('categories/index', {categories});  // Vous pouvez changer 'categoryList' par le nom de votre vue
});

// Exemple de route pour ajouter une catégorie
router.post('/categories',async (req, res) => {
    try{
        const {name} = req.body;
    // Ajouter la logique pour enregistrer la catégorie
    const categories = await CategoryService.createCategory(name);
    res.redirect('/categories');
    } catch(error){
    res.status(500).send("Error creating category");
    }
    
});

//route pour afficher le formulaire pour modifier un produit
router.get('/edit/:id',(req,res) =>{
    const {id} = req.params;
    const categorie = CategoryService.getCategoryByID(id); 
    res.render('categories/newFormC',{categorie});
} )

//route pour modifier le produit 
router.put('/categories/:id', async (req, res) =>{
    const {id} = req.params;
    const {name} = req.body;
    try{
        await CategoryService.createCategory(id, name);
        res.redirect('/categories');
    }catch(error){
    res.status(400).json({ error: error.message });
    }
})

module.exports = router;
