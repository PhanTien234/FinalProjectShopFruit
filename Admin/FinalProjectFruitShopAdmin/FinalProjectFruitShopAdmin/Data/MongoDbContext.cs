using FinalProjectFruitShopAdmin.Model;
using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace FinalProjectFruitShopAdmin.Data
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
        public IMongoCollection<CloudVideo> CloudVideos => _database.GetCollection<CloudVideo>("CloudVideos");
        public IMongoCollection<Order> Orders => _database.GetCollection<Order>("Orders");
        public IMongoCollection<PaymentTransaction> PaymentTransactions => _database.GetCollection<PaymentTransaction>("PaymentTransactions");
        public IMongoCollection<Supplier> Suppliers => _database.GetCollection<Supplier>("Suppliers");
        public IMongoCollection<UnitFruit> UnitFruits => _database.GetCollection<UnitFruit>("UnitFruits");
        public IMongoCollection<PaymentMethod> PaymentMethods => _database.GetCollection<PaymentMethod>("PaymentMethods");
    }
}
