using FinalProjectFruitShopAdmin.Dtos;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IServices
{
    public interface IAuthService
    {
        Task<Result> RegisterAsync(RegisterRequest request);
        //Add other authentication-related methods if needed
        Task<Result> LoginAsync(string email, string password);
        Task<Result> RefreshTokenAsync(string refreshToken, string userId);
        Task<Result> LogoutAsync(string userId);
    }
}
