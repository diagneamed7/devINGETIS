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
    async updateCategories(id, name){
        console.log('Service updateCategories appelé avec :', { id, name }); // Debug
        const category = await CategoryRepository.getCategoriesById(id);
        if(!category){
            throw new Error ('category pas trouvé');
        }
        const updateCategory = await CategoryRepository.updateCategories(id,{name});
        console.log('Mise à jour réussie pour :', { id, name }); // Debug
        return new CategoryDTO(
            updateCategory.name
        );
    }


    //supprimer un produit
    async deleteCategory(id){
    const category = await CategoryRepository.getCategoriesById(id);
    if (!category) {
         throw new Error("Category not found");
       }
       await CategoryRepository.deleteCategories(id);
     }
}

module.exports = new CategoryService();
