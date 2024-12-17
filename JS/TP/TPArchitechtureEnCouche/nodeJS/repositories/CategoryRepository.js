const Category = require('../entities/Category');

class CategoryRepository {
    async createCategory(data) {
        return await Category.create(data);
    }

    async getAllCategories() {
        return await Category.findAll();
    }
    async getCategoriesById(id){
        return await Category.findByPk(id);
    }

    async updateCategories(id, updateData){
        return await Category.update(updateData, {where:{id}})
    }

    async deleteCategories(id){
        Category = this.getCategoriesById(id)
        if (!Category){
            throw new error('categorie introuvable');
            }

        return await Category.destroy();
    }
}

module.exports = new CategoryRepository();
