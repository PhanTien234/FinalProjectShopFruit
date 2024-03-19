using FruitsShopBackend.Data;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;

namespace FruitsShopBackend.Repositories
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly MongoDbContext _context;

        public CategoryRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Category>> GetAllCategories()
        {
            return await _context.Categories.Find(_ => true).ToListAsync();
        }

        public async Task<Category> GetCategoryById(string id)
        {
            return await _context.Categories.Find(cat => cat.Id == id).FirstOrDefaultAsync();
        }

        public async Task<Category> CreateCategory(Category category)
        {
            category.CreatedAt = DateTime.UtcNow;
            await _context.Categories.InsertOneAsync(category);
            return category;
        }

        public async Task UpdateCategory(string id, Category category)
        {
            // Preserve the existing _id field
            category.Id = id;

            // Retrieve the existing document to preserve other fields like CreatedAt
            var existingCategory = await GetCategoryById(id);
            if (existingCategory != null)
            {
                category.CreatedAt = DateTime.UtcNow;
                await _context.Categories.ReplaceOneAsync(cat => cat.Id == id, category);
            }
            else
            {
                // Handle case where category with given id doesn't exist
                throw new InvalidOperationException("Category not found.");
            }
        }

        public async Task DeleteCategory(string id)
        {
            await _context.Categories.DeleteOneAsync(cat => cat.Id == id);
        }
    }
}
