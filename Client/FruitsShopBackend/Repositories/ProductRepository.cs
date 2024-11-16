using FruitsShopBackend.Data;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Model;
using MongoDB.Driver;
using System;
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

        public async Task<List<Product>> GetAllProductsByUserId(string userId)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            return await _context.Products.Find(p => p.UserId == userId).ToListAsync();
        }

        public async Task<List<Product>> GetAllProducts()
        {
            return await _context.Products.Find(_ => true).ToListAsync();
        }
        public async Task<Product> GetProductById(string productId)
        {
            // Implement your authorization logic here if required...
            var product = await _context.Products.Find(p =>p.ProductId == productId).FirstOrDefaultAsync();

            // If the product does not belong to the user, return null or handle as needed
            if (product == null)
            {
                // Example: Throw an exception indicating unauthorized access
                throw new UnauthorizedAccessException("User does not have permission to access this product.");
            }

            return product;
        }

        public async Task<Product> CreateProduct(string userId, Product product)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }

            await _context.Products.InsertOneAsync(product);
            product.UserId = userId; // Set the user ID for the product
            return product;
        }

        public async Task<Product> UpdateProduct(string userId, string productId, Product product)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            var filter = Builders<Product>.Filter.Eq(p => p.ProductId, productId) & Builders<Product>.Filter.Eq(p => p.UserId, userId);
            // Ensure that the product being updated belongs to the user
            var existingProduct = await _context.Products.Find(filter).FirstOrDefaultAsync();
            if (existingProduct == null)
            {
                // Example: Throw an exception indicating unauthorized access or handle as needed
                throw new UnauthorizedAccessException("User does not have permission to update this product.");
            }
            var update = Builders<Product>.Update
                .Set(p => p.Name, product.Name)
                .Set(p => p.Description, product.Description)
                .Set(p => p.DiscountPrice, product.DiscountPrice)
                .Set(p => p.Price, product.Price)
                .Set(p => p.OverallRating, product.OverallRating)
                .Set(p => p.Category, product.Category)
                .Set(p => p.AvailableQuantity, product.AvailableQuantity)
                .Set(p => p.Supplier, product.Supplier)
                .Set(p => p.CloudImages, product.CloudImages)
                .Set(p => p.CloudVideos, product.CloudVideos)
                .Set(p => p.UnitFruit, product.UnitFruit)
                .Set(p => p.IsCertificate, product.IsCertificate);

            await _context.Products.UpdateOneAsync(filter, update);
            return product;
        }

        public async Task DeleteProduct(string userId, string productId)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }

            var filter = Builders<Product>.Filter.Eq(p => p.ProductId, productId) & Builders<Product>.Filter.Eq(p => p.UserId, userId);

            // Ensure that the product being deleted belongs to the user
            var result = await _context.Products.DeleteOneAsync(filter);
        }
    }
}
