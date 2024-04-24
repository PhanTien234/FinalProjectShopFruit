using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Http;

namespace FruitsShopBackend.Dtos
{
    public class ProductCreateUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DiscountPrice { get; set; }
        public decimal Price { get; set; }
        public double OverallRating { get; set; }
        public string CategoryId { get; set; } // Change to CategoryId
        public int AvailableQuantity { get; set; }
        public string SupplierId { get; set; }
        public CloudImage CloudImage { get; set; }
        public IFormFile Image { get; set; }
        public bool IsCertificate { get; set; }
    }
}
