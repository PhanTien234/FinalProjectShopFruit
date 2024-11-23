using FruitsShopBackend.Constants;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IOrderService
    {
        Task<List<OrderDto>> GetAllOrdersByUserId(string userId);
        Task<List<OrderDto>> GetAllOrders();
        Task<OrderDto> CreateOrder(string userId, CreateOrderDto orderDto);
        Task<OrderDto> GetOrderById(string orderId, string userId);
        Task<OrderDto> UpdateOrder(string orderId, string userId, UpdateOrderDto orderDto);
        Task DeleteOrder(string orderId, string userId);
/*        Task<bool> UpdateOrderStatus(string orderId, string userId, OrderStatus status);
        Task<bool> ProcessRefund(string orderId, string userId);*/


    }
}
