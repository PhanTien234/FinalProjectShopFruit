using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace FruitsShopBackend.Model
{
    public class PaymentTransaction
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string TransactionId { get; set; }

        public string OrderId { get; set; }

        public decimal TransactionAmount { get; set; }

        public string PaymentMode { get; set; }

        public string TransactionStatus { get; set; }
    }
}
