using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllOrdersByUserId(string userId);
        Task InsertOrder(Order order);
        Task<Order> GetOrderById(string orderId, string userId);
        Task<Order> UpdateOrder(Order order);
        Task DeleteOrder(string orderId, string userId);
        Task<List<Order>> GetAllOrders();
    }
}
