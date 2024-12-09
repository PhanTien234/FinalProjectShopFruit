using FinalProjectFruitShopAdmin.Data;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using MongoDB.Driver;

namespace FinalProjectFruitShopAdmin.Repositories
{
    public class PaymentMethodRepository : IPaymentMethodRepository
    {
        private readonly MongoDbContext _context;

        public PaymentMethodRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<PaymentMethod>> GetAllPaymentMethods()
        {
            return await _context.PaymentMethods.Find(_ => true).ToListAsync();
        }

        public async Task<PaymentMethod> GetPaymentMethodById(string id)
        {
            return await _context.PaymentMethods.Find(cat => cat.Id == id).FirstOrDefaultAsync();
        }

        public async Task<PaymentMethod> CreatePaymentMethod(PaymentMethod paymentMethod)
        {
            paymentMethod.CreatedAt = DateTime.UtcNow;
            await _context.PaymentMethods.InsertOneAsync(paymentMethod);
            return paymentMethod;
        }

        public async Task UpdatePaymentMethod(string id, PaymentMethod paymentMethod)
        {
            // Preserve the existing _id field
            paymentMethod.Id = id;

            // Retrieve the existing document to preserve other fields like CreatedAt
            var existingPaymentMethod = await GetPaymentMethodById(id);
            if (existingPaymentMethod != null)
            {
                existingPaymentMethod.CreatedAt = DateTime.UtcNow;
                await _context.PaymentMethods.ReplaceOneAsync(cat => cat.Id == id, existingPaymentMethod);
            }
            else
            {
                // Handle case where update with given id doesn't exist
                throw new InvalidOperationException("Update not found.");
            }
        }

        public async Task DeletePaymentMethod(string id)
        {
            await _context.PaymentMethods.DeleteOneAsync(cat => cat.Id == id);
        }
    }
}
