using FinalProjectFruitShopAdmin.Constants;
using System.Collections.Generic;
using System;

namespace FinalProjectFruitShopAdmin.Dtos
{
    public class UpdateOrderDto
    {
        public string ShippingAddressId { get; set; }
        public decimal DiscountAmount { get; set; }
        public OrderStatus OrderStatus { get; set; }
        public PaymentStatus PaymentStatus { get; set; }
        public string PaymentMethodId { get; set; }
        public DateTime? PaymentDate { get; set; }
        public List<UpdateOrderItemDto> OrderItems { get; set; }
    }
    public class UpdateOrderItemDto
    {
        public string OrderItemId {  get; set; }
        public string ProductId { get; set; }
        public int Quantity { get; set; }

    }
}
