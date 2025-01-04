// routes/productRoutes.js
const ProductService = require("../services/ProductService");
const CategoryService = require("../services/CategoryService");

const express = require("express");
const ProductsController = require("../controllers/ProductsController");
const { isAuthenticated, isAdmin } = require("../middlewares/authMiddleware");
const router = express.Router();

// Exemple de route pour afficher tous les produits
// Route principale pour afficher les produits
router.get("/",isAuthenticated, async (req, res) => {
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
router.post("/",isAuthenticated,isAdmin, async (req, res) => {
  try {
    const { name, price, categoryId } = req.body;
    const prod = await ProductService.createProduct(name, price, categoryId);

    res.redirect("/products");
  } catch (error) {
    res.status(500).send("Error creating product");
  }
});
//route pour afficher le formulaire pour modifier un produit 
router.get('/edit/:id',isAuthenticated, isAdmin, async (req,res) => {
  const { id } = req.params;
  try {
    //recupere le produit a modifier
  const product =  await ProductService.getProductById(id);
  const categories = await CategoryService.getAllCategories();
  res.render('products/newForm', { product, categories})
}catch(error){
  console.error("Error fetching product for edit:", error.message);
    res.status(500).send("Error fetching product for edit");
  }
});

//route pour modifier un produit
router.put('/:id',isAuthenticated,isAdmin,async (req, res)=>{
  const { id } = req.params;
  const {name, price ,categoryId } = req.body;
  try {
      await ProductService.updateProduct(id,name,price,categoryId) //logique pour mettre à jour
      res.redirect('/products');

  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).send("Error updating product");
  }
})

// Route DELETE pour supprimer un produit
router.delete("/:id",isAuthenticated,isAdmin, async (req, res) => {
  const { id } = req.params;
  try {
    await ProductService.deleteProduct(id);
    res.redirect("/products");
    // Rediriger vers la liste des produits après suppression
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
