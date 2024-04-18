using FruitsShopBackend.Data;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Repositories
{
    public class SupplierRepository : ISupplierRepository
    {
        private readonly IMongoCollection<Supplier> _suppliers;

        public SupplierRepository(MongoDbContext dbContext)
        {
            _suppliers = dbContext.Suppliers;
        }

        public async Task<IEnumerable<Supplier>> GetAllSuppliers()
        {
            return await _suppliers.Find(s => true).ToListAsync();
        }

        public async Task<IEnumerable<Supplier>> GetAllSuppliersByUser(string userId)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            return await _suppliers.Find(s => true).ToListAsync();
        }


        public async Task<Supplier> GetSupplierById(string id)
        {
            return await _suppliers.Find(s => s.SupplierId == id).FirstOrDefaultAsync();
        }

        public async Task CreateSupplier(string userId, Supplier supplier)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            await _suppliers.InsertOneAsync(supplier);
        }

        public async Task UpdateSupplier(string userId, string id, Supplier supplier)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            await _suppliers.ReplaceOneAsync(s => s.SupplierId == id, supplier);
        }

        public async Task DeleteSupplier(string userId, string id)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            await _suppliers.DeleteOneAsync(s => s.SupplierId == id);
        }
    }
}
