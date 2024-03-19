using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using FruitsShopBackend.Dtos;

namespace FruitsShopBackend.Model
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public double OverallRating { get; set; }

        public CategoryDto Category { get; set; }

        public int AvailableQuantity { get; set; }

        public string SupplierId { get; set; }

        public CloudImage CloudImage{ get; set; }

        public bool IsCertificate { get; set; }
    }
}
