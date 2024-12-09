using Microsoft.AspNetCore.Http;

namespace FinalProjectFruitShopAdmin.Dtos
{
    public class ImageUploadRequest
    {
        public IFormFile File { get; set; }
    }
}
