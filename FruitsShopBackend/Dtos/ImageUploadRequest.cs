using Microsoft.AspNetCore.Http;

namespace FruitsShopBackend.Dtos
{
    public class ImageUploadRequest
    {
        public IFormFile File { get; set; }
    }
}
