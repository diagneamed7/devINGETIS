// routes/productRoutes.js
const express = require("express");
const router = express.Router();
const ProductService = require('../services/ProductService')
const CategoryService = require('../services/CategoryService');


// Exemple de route pour afficher tous les produits
// Route principale pour afficher les produits
router.get("/", async (req, res) => {
  try {
    const products = await ProductService.getAllProducts();
    const categories = await CategoryService.getAllCategories();
    res.render("products/index", { products, categories });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send("Server Error");
  }
});
// Exemple de route pour ajouter un produit
router.post("/", async(req, res) => {
  try {
  const { name, price , catId} = req.body;
  // Ici, vous pouvez ajouter la logique pour enregistrer le produit dans la base de données
const product =  await ProductService.createProduct(name, price, catId) ;
  res.redirect("products");
}catch (error) {
    console.error("Error fetching products:", error.message);
    res.status(500).send("Server Error");
  }
});


//route pour supprimer un produit
router.delete('/product/delete/:id', async(req,res)=>{
  const productId = req.param.id;
  try{
    const product =  await ProductService.deletProduct(productId);
    res.redirect('/products');
  }catch(error){
    console.error('Error deleting product',error.message);
    res.status(500).sendServer('Server error');
  }
});
module.exports = router;
