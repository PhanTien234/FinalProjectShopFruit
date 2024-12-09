using System.Collections.Generic;
using System;

namespace FinalProjectFruitShopAdmin.Dtos
{
    public class CreateOrderDto
    {
        public string ShippingAddressId { get; set; }
        public decimal TotalPrices { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string PaymentMethodId { get; set; }
        public List<CreateOrderItemDto> OrderItems { get; set; }
    }
    public class CreateOrderItemDto
    {
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }

    }

}
