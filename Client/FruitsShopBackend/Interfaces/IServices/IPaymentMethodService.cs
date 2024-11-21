using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IPaymentMethodService
    {
        Task<IEnumerable<PaymentMethodDto>> GetAllPaymentMethods();
        Task<PaymentMethodDto> GetPaymentMethodById(string id);
        Task<PaymentMethodDto> CreatePaymentMethod(PaymentMethodCreateUpdateDto paymentMethodDto);
        Task UpdatePaymentMethod(string id, PaymentMethodCreateUpdateDto paymentMethodDto);
        Task DeletePaymentMethod(string id);
    }
}
