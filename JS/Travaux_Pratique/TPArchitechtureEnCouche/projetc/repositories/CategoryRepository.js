const Category = require("../entities/Category");
class CategoryRepository {
  async createCategory(data) {
    return await Category.create(data);
  }
  async getAllCategories() {
    return await Category.findAll();
  }
}
module.exports = new CategoryRepository();
