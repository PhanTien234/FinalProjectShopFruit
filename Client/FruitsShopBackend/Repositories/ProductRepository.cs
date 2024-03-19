using FruitsShopBackend.Data;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Model;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Repositories
{
    public class ProductRepository : IProductRepository
    {
        private readonly MongoDbContext _context;

        public ProductRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _context.Products.Find(p => true).ToListAsync();
        }

        public async Task<Product> GetProductById(string productId)
        {
            return await _context.Products.Find(p => p.ProductId == productId).FirstOrDefaultAsync();
        }

        public async Task<Product> CreateProduct(Product product)
        {
            await _context.Products.InsertOneAsync(product);
            return product;
        }

        public async Task<Product> UpdateProduct(string productId, Product product)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.ProductId, productId);
            var update = Builders<Product>.Update
                .Set(p => p.Name, product.Name)
                .Set(p => p.Description, product.Description)
                .Set(p => p.Price, product.Price)
                .Set(p => p.OverallRating, product.OverallRating)
                .Set(p => p.Category, product.Category)
                .Set(p => p.AvailableQuantity, product.AvailableQuantity)
                .Set(p => p.SupplierId, product.SupplierId)
                .Set(p=> p.CloudImage, product.CloudImage)
                .Set(p => p.IsCertificate, product.IsCertificate);

            await _context.Products.UpdateOneAsync(filter, update);
            return product;
        }

        public async Task DeleteProduct(string productId)
        {
            var filter = Builders<Product>.Filter.Eq(p => p.ProductId, productId);
            await _context.Products.DeleteOneAsync(filter);
        }
    }
}
