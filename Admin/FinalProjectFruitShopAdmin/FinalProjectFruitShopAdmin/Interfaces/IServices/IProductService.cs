using FinalProjectFruitShopAdmin.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IServices
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProducts();
        Task<List<ProductDto>> GetAllProductsByUserId(string userId);
        Task<ProductDto> GetProductById(string productId);
        Task<ProductDto> CreateProduct(string userId, ProductCreateUpdateDto productDto);
        Task<ProductDto> UpdateProduct(string userId, string productId, ProductCreateUpdateDto productDto);
        Task DeleteProduct(string userId, string productId);
    }
}
