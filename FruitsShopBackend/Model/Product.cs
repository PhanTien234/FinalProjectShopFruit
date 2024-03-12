using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace FruitsShopBackend.Model
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public decimal Price { get; set; }

        public double OverallRating { get; set; }

        [BsonRepresentation(BsonType.ObjectId)]
        public string CategoryId { get; set; }

        public int AvailableQuantity { get; set; }

        public string SupplierId { get; set; }

        public string ImageId { get; set; }

        public bool IsCertificate { get; set; }
    }
}
