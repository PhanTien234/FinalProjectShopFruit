using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace FruitsShopBackend.Model
{
    public class CloudImage
    {
        [BsonId]
        [Key]
        public string ImageId { get; set; }

        public string ImagePath { get; set; }
    }
}
