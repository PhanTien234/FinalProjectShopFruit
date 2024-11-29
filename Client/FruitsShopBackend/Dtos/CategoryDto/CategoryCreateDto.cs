using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Http;

namespace FruitsShopBackend.Dtos
{
    public class CategoryCreateUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public CloudImage CloudImage { get; set; }

    }
}
