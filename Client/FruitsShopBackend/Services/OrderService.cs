using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using FruitsShopBackend.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        public OrderService(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }
        public async Task<List<Order>> GetAllOrdersByUserId(string userId)
        {
            return await _orderRepository.GetAllOrdersByUserId(userId);
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await _orderRepository.GetAllOrders();
        }

        public async Task<Order> CreateOrder(string userId, CreateOrderDto orderDto)
        {
            // Additional business logic can be added here if needed before calling the repository method
            // For example, validating user's eligibility for placing an order

            // Call the repository method to create the order
            return await _orderRepository.CreateOrder(userId, orderDto);
        }

        public async Task<Order> GetOrderById(string orderId, string userId)
        {
            return await _orderRepository.GetOrderById(orderId, userId);
        }

        public async Task<Order> UpdateOrder(string orderId, string userId, UpdateOrderDto orderDto)
        {
            // Additional business logic can be added here if needed before calling the repository method
            // For example, checking if the order can be updated based on its status

            // Call the repository method to update the order
            return await _orderRepository.UpdateOrder(orderId, userId, orderDto);
        }

        public async Task DeleteOrder(string orderId, string userId)
        {
            // Additional business logic can be added here if needed before calling the repository method
            // For example, checking if the order can be deleted based on its status

            // Call the repository method to delete the order
            await _orderRepository.DeleteOrder(orderId, userId);
        }

    }
}
