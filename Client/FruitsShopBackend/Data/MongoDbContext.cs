using FruitsShopBackend.Model;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace FruitsShopBackend.Data
{
    public class MongoDbContext
    {
        private readonly IMongoDatabase _database;

        public MongoDbContext(IConfiguration configuration)
        {
            // Retrieve MongoDB connection string from appsettings.json
            string connectionString = configuration.GetConnectionString("MongoDBConnection");

            // Create MongoClient
            var client = new MongoClient(connectionString);

            // Access database
            _database = client.GetDatabase("FruitsShop");
        }

        // Add properties for each collection you want to interact with
        public IMongoCollection<Product> Products => _database.GetCollection<Product>("Products");
        public IMongoCollection<Category> Categories => _database.GetCollection<Category>("Categories");
        public IMongoCollection<CloudImage> CloudImages => _database.GetCollection<CloudImage>("CloudImages");
        public IMongoCollection<Cart> Carts => _database.GetCollection<Cart>("Carts");
        public IMongoCollection<Order> Orders => _database.GetCollection<Order>("Orders");
        public IMongoCollection<PaymentTransaction> PaymentTransactions => _database.GetCollection<PaymentTransaction>("PaymentTransactions");
        public IMongoCollection<Supplier> Suppliers => _database.GetCollection<Supplier>("Suppliers");
    }
}
