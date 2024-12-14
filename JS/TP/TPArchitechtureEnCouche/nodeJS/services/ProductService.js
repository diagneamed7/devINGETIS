const ProductRepository = require("../repositories/ProductRepository");
const ProductDTO = require("../dtos/ProductDTO");

class ProductService {
  async createProduct(name, price, categoryId) {
    const product = await ProductRepository.createProduct({
      name,
      price,
      categoryId,
    });
    return new ProductDTO(
      product.id,
      product.name,
      product.price,
      product.category
    );
  }

  async getAllProducts() {
    const products = await ProductRepository.getAllProducts();
    return products.map(
      (product) =>
        new ProductDTO(
          product.id,
          product.name,
          product.price,
          product.category
        )
    );
  }
  //methode pour retounrner un seule produit
  async getProductById(id) {
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return new ProductDTO(
      product.id,
      product.name,
      product.price,
      product.category
    );
  }

// Méthode pour modifier un produit
async updateProduct(id, name, price, categoryId) {
  // Récupérer le produit existant
  const product = await ProductRepository.getProductById(id);
  if (!product) {
    throw new Error("Product not found");
  }

  // Mettre à jour les propriétés du produit
  const updatedProduct = await ProductRepository.updateProduct(id, {
    name,
    price,
    categoryId
  });

  // Retourner le produit mis à jour
  return new ProductDTO(
    updatedProduct.id,
    updatedProduct.name,
    updatedProduct.price,
    updatedProduct.category
  );
}


  // Méthode pour supprimer un produit
  async deleteProduct(id) {
    const product = await ProductRepository.getProductById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    await ProductRepository.deleteProduct(id);
  }

  //Methode pour modifier un fichier
  async editProduct(id) {}
}

module.exports = new ProductService();
