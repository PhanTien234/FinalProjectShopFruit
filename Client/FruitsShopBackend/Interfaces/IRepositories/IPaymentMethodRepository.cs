using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface IPaymentMethodRepository
    {
        Task<IEnumerable<PaymentMethod>> GetAllPaymentMethods();
        Task<PaymentMethod> GetPaymentMethodById(string id);
        Task<PaymentMethod> CreatePaymentMethod(PaymentMethod paymentMethod);
        Task UpdatePaymentMethod(string id, PaymentMethod paymentMethod);
        Task DeletePaymentMethod(string id);
    }
}
