using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;

namespace FruitsShopBackend.Model
{
    public class UnitFruit
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        public string Name { get; set; }

        [BsonDateTimeOptions(Kind = DateTimeKind.Local)]
        public DateTime CreatedAt { get; set; }
    }
}
