using FruitsShopBackend.Dtos;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IAuthService
    {
        Task<Result> RegisterAsync(RegisterRequest request);
        //Add other authentication-related methods if needed
        Task<Result> LoginAsync(string email, string password);
    }
}
