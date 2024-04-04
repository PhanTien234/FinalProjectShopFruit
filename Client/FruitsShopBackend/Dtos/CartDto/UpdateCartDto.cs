using System.Collections.Generic;

namespace FruitsShopBackend.Dtos
{
    public class UpdateCartDto
    {
        public string ProductId { get; set; }
        public int Quantity { get; set; }
    }
}
