using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface ICloudinaryService
    {
        Task<CloudImage> UploadImageAsync(IFormFile file);
    }
}
