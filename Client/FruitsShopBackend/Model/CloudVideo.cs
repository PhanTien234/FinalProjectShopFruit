using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace FruitsShopBackend.Model
{
    public class CloudVideo
    {
        [BsonId]
        [Key]
        public string VideoId { get; set; }

        public string VideoPath { get; set; }
    }
}
