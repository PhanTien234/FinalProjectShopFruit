using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace FruitsShopBackend.Dtos
{
    public class ProductCreateUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal DiscountPrice { get; set; }
        public decimal Price { get; set; }
        public double OverallRating { get; set; }
        public string CategoryId { get; set; } 
        public int AvailableQuantity { get; set; }
        public string SupplierId { get; set; }
        public List<CloudImage> CloudImages { get; set; }
        public List<CloudVideo> CloudVideos { get; set; }
        public List<IFormFile> Images { get; set; } 
        public List<IFormFile> Videos { get; set; }
        public string UnitFruitId { get; set; }
        public bool IsCertificate { get; set; }
    }
}
