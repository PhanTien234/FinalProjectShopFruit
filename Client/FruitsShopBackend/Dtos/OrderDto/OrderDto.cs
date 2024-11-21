using System.Collections.Generic;
using System;

namespace FruitsShopBackend.Dtos
{
    public class OrderDto
    {
        public string OrderId { get; set; }

        public string UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public string ShippingAddressId { get; set; }

        public decimal AmountPaid { get; set; }

        public decimal DiscountAmount { get; set; }

        public decimal TotalOrderValue { get; set; }

        public string OrderStatus { get; set; }

        public string PaymentStatus { get; set; }

        public DateTime? PaymentDate { get; set; }

        public string PaymentMethod { get; set; }

        public List<OrderItemDto> OrderItems { get; set; }
    }

    public class OrderItemDto
    {
        public string OrderItemId { get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
