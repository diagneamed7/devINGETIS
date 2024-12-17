const { where } = require("sequelize");
const Product = require("../entities/Product");
//const { updateProduct } = require("../services/ProductService");

class ProductRepository {
  async createProduct(data) {
    return await Product.create(data);
  }

  async getAllProducts() {
    return await Product.findAll({ include: "category" });
  }

  // Récupérer un produit par ID
  async getProductById(id) {
    return await Product.findByPk(id);
  }
  // Modifier un produit
  async updateProduct(id, updateData){
    return await Product.update(updateData, {where: {id}
    });
  }
  // Supprimer un produit par ID
  async deleteProduct(id) {
    const product = await this.getProductById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return await product.destroy();
  }

}

module.exports = new ProductRepository();
