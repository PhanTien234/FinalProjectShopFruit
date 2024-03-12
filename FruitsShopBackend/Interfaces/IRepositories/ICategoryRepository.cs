using FruitsShopBackend.Model;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface ICategoryRepository
    {
        Task<IEnumerable<Category>> GetAllCategories();
        Task<Category> GetCategoryById(string id);
        Task<Category> CreateCategory(Category category);
        Task UpdateCategory(string id, Category category);
        Task DeleteCategory(string id);
    }
}
