using FinalProjectFruitShopAdmin.Model;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IServices
{
    public interface ICloudinaryService
    {
        Task<CloudImage> UploadImageAsync(IFormFile file);
        Task<CloudVideo> UploadVideoAsync(IFormFile file);
    }
}
