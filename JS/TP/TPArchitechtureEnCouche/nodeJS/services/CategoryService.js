const CategoryRepository = require('../repositories/CategoryRepository');
const CategoryDTO = require('../dtos/CategoryDTO');

class CategoryService {
    async createCategory(name) {
        const category = await CategoryRepository.createCategory({ name });
        return new CategoryDTO(
            category.id, 
            category.name);
    }

    async getAllCategories() {
        const categories = await CategoryRepository.getAllCategories();
        return categories.map(category => new CategoryDTO(category.id, category.name));
    }
    async getCategoryByID(id){
        const category = await CategoryRepository.getCategoriesById(id);
        if(!category){
            throw new Error("category not foundd");   
        }
        return new CategoryDTO(
            category.id,
            category.name
        )
    }

    async deleteCategory(id){
    const category = await CategoryRepository.getCategoriesByID(id);
    if (!category) {
         throw new Error("Category not found");
       }
       await CategoryRepository.deleteCategories(id);
     }
}

module.exports = new CategoryService();
