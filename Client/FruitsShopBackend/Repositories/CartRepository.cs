using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Model;
using Microsoft.EntityFrameworkCore;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FruitsShopBackend.Repositories
{
    public class CartRepository : ICartRepository
    {
        private readonly MongoDbContext _context;

        public CartRepository(MongoDbContext context)
        {
            _context = context;
        }

        public async Task<Cart> GetCartByUserId(string userId)
        {
            return await _context.Carts.Find(c => c.UserId == userId).FirstOrDefaultAsync();
        }

        public async Task UpdateCart(Cart cart)
        {
            var filter = Builders<Cart>.Filter.Eq(c => c.CartId, cart.CartId);
            var options = new ReplaceOptions { IsUpsert = true };
            await _context.Carts.ReplaceOneAsync(filter, cart, options);
        }
    }

}
