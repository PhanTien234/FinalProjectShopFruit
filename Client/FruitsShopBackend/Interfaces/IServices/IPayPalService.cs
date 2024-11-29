using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using PayPalCheckoutSdk.Orders;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IPayPalService
    {
        Task<PayPalOrderResponse> CreateOrder(decimal amount);
        Task SetupSellerPayPalAccount(SellerPayPalAccountDto accountDto);
        Task SendPayment(string recipientEmail, decimal amount);
        Task<User> GetSellerPayPalByUserId(string userId);
    }
}
