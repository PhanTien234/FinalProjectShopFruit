using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllCategories();
        Task<CategoryDto> GetCategoryById(string id);
        Task<CategoryDto> CreateCategory(CategoryCreateUpdateDto categoryDto);
        Task UpdateCategory(string id, CategoryCreateUpdateDto categoryDto);
        Task DeleteCategory(string id);
    }
}
