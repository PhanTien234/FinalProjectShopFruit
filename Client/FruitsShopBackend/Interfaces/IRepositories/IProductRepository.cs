using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface IProductRepository
    {
        Task<List<Product>> GetAllProducts();
        Task<Product> GetProductById(string productId);
        Task<Product> CreateProduct(Product product);
        Task<Product> UpdateProduct(string productId, Product product);
        Task DeleteProduct(string productId);
    }
}
