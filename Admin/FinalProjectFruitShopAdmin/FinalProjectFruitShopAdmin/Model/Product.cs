using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using FinalProjectFruitShopAdmin.Dtos;
using System.Collections.Generic;

namespace FinalProjectFruitShopAdmin.Model
{
    public class Product
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string ProductId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }

        public string Description { get; set; }
        public decimal DiscountPrice { get; set; }

        public decimal Price { get; set; }

        public double OverallRating { get; set; }

        public CategoryDto Category { get; set; }

        public int AvailableQuantity { get; set; }

        public SupplierDto Supplier { get; set; }

        public List<CloudImage> CloudImages { get; set; } = new List<CloudImage>(); 
        public List<CloudVideo> CloudVideos { get; set; } = new List<CloudVideo>();
        public UnitFruitDto UnitFruit { get; set; }

        public bool IsCertificate { get; set; }
    }
}
