using FinalProjectFruitShopAdmin.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace FinalProjectFruitShopAdmin.Dtos
{
    public class ProductDto
    {
        public string ProductId { get; set; }
        public string UserId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DiscountPrice { get; set; }
        public decimal Price { get; set; }
        public double OverallRating { get; set; }
        public CategoryDto Category { get; set; } 
        public int AvailableQuantity { get; set; }
        public SupplierDto Supplier { get; set; }
        public List<CloudImage> CloudImages { get; set; }
        public List<CloudVideo> CloudVideos { get; set; }
        public UnitFruitDto UnitFruit { get; set; }
        public bool IsCertificate { get; set; }
    }
}
