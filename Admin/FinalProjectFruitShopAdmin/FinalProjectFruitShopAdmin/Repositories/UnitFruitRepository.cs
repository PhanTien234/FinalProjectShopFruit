using FinalProjectFruitShopAdmin.Data;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Model;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
namespace FinalProjectFruitShopAdmin.Repositories
{
    public class UnitFruitRepository : IUnitFruitRepository
    {
        private readonly MongoDbContext _context;

        public UnitFruitRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<UnitFruit>> GetAllUnitFruits()
        {
            return await _context.UnitFruits.Find(_ => true).ToListAsync();
        }

        public async Task<UnitFruit> GetUnitFruitById(string id)
        {
            return await _context.UnitFruits.Find(cat => cat.Id == id).FirstOrDefaultAsync();
        }

        public async Task<UnitFruit> CreateUnitFruit(UnitFruit unit)
        {
            unit.CreatedAt = DateTime.UtcNow;
            await _context.UnitFruits.InsertOneAsync(unit);
            return unit;
        }

        public async Task UpdateUnitFruit(string id, UnitFruit unit)
        {
            // Preserve the existing _id field
            unit.Id = id;

            // Retrieve the existing document to preserve other fields like CreatedAt
            var existingUnitFruit = await GetUnitFruitById(id);
            if (existingUnitFruit != null)
            {
                unit.CreatedAt = DateTime.UtcNow;
                await _context.UnitFruits.ReplaceOneAsync(cat => cat.Id == id, unit);
            }
            else
            {
                // Handle case where category with given id doesn't exist
                throw new InvalidOperationException("unit not found.");
            }
        }

        public async Task DeleteUnitFruit(string id)
        {
            await _context.UnitFruits.DeleteOneAsync(cat => cat.Id == id);
        }
    }
}
