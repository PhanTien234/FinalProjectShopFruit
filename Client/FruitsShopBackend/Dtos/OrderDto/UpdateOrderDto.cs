using FruitsShopBackend.Constants;
using System.Collections.Generic;
using System;

namespace FruitsShopBackend.Dtos
{
    public class UpdateOrderDto
    {
        public string ShippingAddressId { get; set; }
        public decimal DiscountAmount { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public DateTime? PaymentDate { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        public List<OrderItemDto> OrderItems { get; set; }
    }
}
