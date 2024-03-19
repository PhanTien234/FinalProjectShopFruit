using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace FruitsShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadImageController : ControllerBase
    {
        private readonly Cloudinary _cloudinary;
        private readonly MongoDbContext _context;

        public UploadImageController(Cloudinary cloudinary, MongoDbContext context)
        {
            _cloudinary = cloudinary;
            _context = context;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> UploadImage([FromForm] ImageUploadRequest request)
        {
            if (request.File == null || request.File.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            // Upload image to Cloudinary
            var uploadParams = new ImageUploadParams
            {
                File = new FileDescription(request.File.FileName, request.File.OpenReadStream())
            };

            var uploadResult = await _cloudinary.UploadAsync(uploadParams);

            // Store image path in MongoDB CloudImage collection
            var cloudImage = new CloudImage
            {
                // You can use a GUID or any custom identifier here
                ImageId = uploadResult.PublicId,
                ImagePath = uploadResult.SecureUrl.AbsoluteUri
            };

            await _context.CloudImages.InsertOneAsync(cloudImage);

            return Ok(cloudImage);
        }
    }
}
