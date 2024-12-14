const ProductService = require("../services/ProductService");
const CategoryService = require("../services/CategoryService");

class ProductController {
  async addProduct(req, res) {
    const { name, price, categoryId } = req.body;
    try {
      const product = await ProductService.createProduct(
        name,
        price,
        categoryId
      );
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  async getProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      const categories = await CategoryService.getAllCategories();
      res.render("products/index", { products, categories });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  //supprimer un produit
  async deleteProduct(req,res) {
    const productId = req.param.id;
    try{
      const product =  await ProductService.deletProduct(productId);
      res.redirect('/products');
    }catch(error){
      console.error('Error deleting product',error.message);
      res.status(500).sendServer('Server error');
    }
   
  }

}
module.exports = new ProductController();
