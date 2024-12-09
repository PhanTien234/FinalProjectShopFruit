using FinalProjectFruitShopAdmin.Constants;
using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IServices
{
    public interface IOrderService
    {
        Task<List<OrderDto>> GetAllOrdersByUserId(string userId);
        Task<List<OrderDto>> GetAllOrders();
        Task<OrderDto> GetOrderById(string orderId, string userId);
        Task DeleteOrder(string orderId, string userId);
/*        Task<bool> UpdateOrderStatus(string orderId, string userId, OrderStatus status);
        Task<bool> ProcessRefund(string orderId, string userId);*/


    }
}
