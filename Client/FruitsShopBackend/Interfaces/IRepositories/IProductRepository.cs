using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProductsByUserId(string userId);
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(string productId);
        Task<Product> CreateProduct(string userId, Product product);
        Task<Product> UpdateProduct(string userId, string productId, Product product);
        Task DeleteProduct(string userId, string productId);
    }
}
