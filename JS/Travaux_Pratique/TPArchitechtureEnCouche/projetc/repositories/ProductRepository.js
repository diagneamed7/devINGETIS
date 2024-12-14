const Product = require("../entities/Products");
class ProductRepository {
  async createProduct(data) {
    return await Product.create(data);
  }
  async getAllProducts() {
    return await Product.findAll({ include: "category" });
  }

  //fonction pour trier un produit de par son id 
  async getById(data){
    return await Product.findByPk(data);
  }


  
  //supprimer
   async deleteProduct (data) {
   
      const product = await Product.findByPk(data);
      if (product) {
        await product.destroy(); // Supprime le produit de la base de données
        return true;}
      }
     
  
}

module.exports = new ProductRepository();
