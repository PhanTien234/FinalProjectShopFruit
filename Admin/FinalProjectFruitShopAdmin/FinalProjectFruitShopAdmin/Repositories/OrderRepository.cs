using FinalProjectFruitShopAdmin.Data;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Model;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Order> _ordersCollection;

        public OrderRepository(MongoDbContext context)
        {
            _context = context;
            _ordersCollection = _context.Orders;
        }

        public async Task<List<Order>> GetAllOrdersByUserId(string userId)
        {
            return await _ordersCollection.Find(o => o.UserId == userId).ToListAsync();
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await _ordersCollection.Find(_ => true).ToListAsync();
        }

        public async Task<Order> GetOrderById(string orderId, string userId)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.OrderId, orderId) & Builders<Order>.Filter.Eq(o => o.UserId, userId);
            return await _ordersCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task InsertOrder(Order order)
        {
            await _ordersCollection.InsertOneAsync(order);
        }

        public async Task<Order> UpdateOrder(Order order)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.OrderId, order.OrderId) & Builders<Order>.Filter.Eq(o => o.UserId, order.UserId);
            var options = new FindOneAndReplaceOptions<Order>
            {
                ReturnDocument = ReturnDocument.After
            };
            return await _ordersCollection.FindOneAndReplaceAsync(filter, order, options);
        }

        public async Task DeleteOrder(string orderId, string userId)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.OrderId, orderId) & Builders<Order>.Filter.Eq(o => o.UserId, userId);
            await _ordersCollection.DeleteOneAsync(filter);
        }
    }
}
