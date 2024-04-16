using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.Collections.Generic;
using System;
using FruitsShopBackend.Constants;
using FruitsShopBackend.Dtos;

namespace FruitsShopBackend.Model
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string OrderId { get; set; }

        public string UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public AddressDto ShippingAddress { get; set; }

        public decimal AmountPaid { get; set; }

        public decimal DiscountAmount { get; set; }

        public decimal TotalOrderValue { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public PaymentStatus PaymentStatus { get; set; }

        public DateTime? PaymentDate { get; set; }

        public PaymentMethod PaymentMethod { get; set; }

        public List<OrderItem> OrderItems { get; set; }
    }
    public class OrderItem
    {
        [BsonId]
        public string OrderItemId { get; set; }
        public string ProductId { get; set; }
        public string UserId { get; set; }

        public int Quantity { get; set; }

        public decimal PricePerUnit { get; set; }

        public decimal TotalPrice { get { return Quantity * PricePerUnit; } }
    }
}
