using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Model;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IServices
{
    public interface IPayPalService
    {
        Task<PayPalOrderResponse> CreateOrder(decimal amount);
        Task SetupSellerPayPalAccount(SellerPayPalAccountDto accountDto);
        Task SendPayment(string recipientEmail, decimal amount);
        Task<User> GetSellerPayPalByUserId(string userId);
    }
}
