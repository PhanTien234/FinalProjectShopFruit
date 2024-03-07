using FruitsShopBackend.Dtos;
using System.Threading.Tasks;

namespace FruitsShopBackend.IServices
{
    public interface IAuthService
    {
        Task<Result> RegisterAsync(RegisterRequest request);
        //Add other authentication-related methods if needed
    }
}
