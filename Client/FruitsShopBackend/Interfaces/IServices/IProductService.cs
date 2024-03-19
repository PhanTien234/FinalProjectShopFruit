using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IProductService
    {
        Task<List<ProductDto>> GetAllProducts();
        Task<ProductDto> GetProductById(string productId);
        Task<ProductDto> CreateProduct(ProductCreateUpdateDto productDto);
        Task<ProductDto> UpdateProduct(string productId, ProductCreateUpdateDto productDto);
        Task DeleteProduct(string productId);
    }
}
