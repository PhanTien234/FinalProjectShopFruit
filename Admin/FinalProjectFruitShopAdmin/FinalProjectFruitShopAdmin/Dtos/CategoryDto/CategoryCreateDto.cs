using FinalProjectFruitShopAdmin.Model;
using Microsoft.AspNetCore.Http;

namespace FinalProjectFruitShopAdmin.Dtos
{
    public class CategoryCreateUpdateDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public IFormFile Image { get; set; }
        public CloudImage CloudImage { get; set; }

    }
}
