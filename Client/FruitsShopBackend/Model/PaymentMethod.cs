using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace FruitsShopBackend.Model
{
    public class PaymentMethod
    {
       
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; } 

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CreatedAt { get; set; }
    }
}
