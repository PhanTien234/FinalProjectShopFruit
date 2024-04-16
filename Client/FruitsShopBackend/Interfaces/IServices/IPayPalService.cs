using FruitsShopBackend.Dtos;
using PayPalCheckoutSdk.Orders;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IPayPalService
    {
        Task<string> CreateOrder(Order order);
        Task<bool> CapturePayment(string orderId);
        Task<bool> SetupSellerPayPalAccount(SetAccountSellerPayPalRequestDto accountRequest);
        Task<bool> SendPaymentToSeller(string sellerPayPalEmail, decimal amount);
    }
}
