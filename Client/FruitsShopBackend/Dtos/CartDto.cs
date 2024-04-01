using System.Collections.Generic;

namespace FruitsShopBackend.Dtos
{
    public class CartDto
    {
        public string UserId { get; set; }
        public List<CartItemDto> Items { get; set; }
        public decimal TotalPrice { get; set; }
    }
}
