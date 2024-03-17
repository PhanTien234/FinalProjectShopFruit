using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace FruitsShopBackend.Model
{
    public class CloudImage
    {
        [BsonId]
        public string ImageId { get; set; }

        public string ImagePath { get; set; }
    }
}
