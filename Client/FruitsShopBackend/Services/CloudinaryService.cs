using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
namespace FruitsShopBackend.Services
{
    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;

        public CloudinaryService(Cloudinary cloudinary)
        {
            _cloudinary = cloudinary;
        }

        public async Task<CloudImage> UploadImageAsync(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return null;
            }

            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(file.FileName, file.OpenReadStream())
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            return new CloudImage
            {
                ImageId = uploadResult.PublicId,
                ImagePath = uploadResult.SecureUrl.AbsoluteUri
            };
        }
    }
}
