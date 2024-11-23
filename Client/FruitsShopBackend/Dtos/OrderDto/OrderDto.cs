using System.Collections.Generic;
using System;
using FruitsShopBackend.Constants;

namespace FruitsShopBackend.Dtos
{
    public class OrderDto
    {
        public string OrderId { get; set; }

        public string UserId { get; set; }

        public DateTime OrderDate { get; set; }

        public AddressDto ShippingAddress { get; set; }

        public decimal TotalPrices { get; set; }

        public OrderStatus OrderStatus { get; set; }

        public PaymentStatus PaymentStatus { get; set; }

        public DateTime? PaymentDate { get; set; }

        public PaymentMethodDto PaymentMethod { get; set; }

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
