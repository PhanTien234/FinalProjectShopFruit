using FruitsShopBackend.Constants;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IOrderService
    {
        Task<List<Order>> GetAllOrdersByUserId(string userId);
        Task<List<Order>> GetAllOrders();
        Task<Order> CreateOrder(string userId, CreateOrderDto orderDto);
        Task<Order> GetOrderById(string orderId, string userId);
        Task<Order> UpdateOrder(string orderId, string userId, UpdateOrderDto orderDto);
        Task DeleteOrder(string orderId, string userId);
        Task<bool> UpdateOrderStatus(string orderId, string userId, OrderStatus status);
        Task<bool> ProcessRefund(string orderId, string userId);


    }
}
