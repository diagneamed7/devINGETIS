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
router.put('/:id', async (req, res) =>{
    console.log('Route PUT /categories/:id appelée'); // Debug
    const {id} = req.params;
    const {name} = req.body;
    console.log('Données reçues :', { id, name }); // Debug
    try{
        await CategoryService.updateCategories(id, name);
        res.redirect('/categories');
    }catch(error){
        console.error('Erreur dans la route PUT:', error.message); // Debug
    res.status(400).json({ error: error.message });
    }
})
router.delete('/:id',async(req,res)=>{
    const {id} = req.params;
    try{
        await CategoryService.deleteCategory(id);
        res.redirect('/categories');
    }catch(error){
        res.status(400).json({ details: error.message})
    }
 })
module.exports = router;
