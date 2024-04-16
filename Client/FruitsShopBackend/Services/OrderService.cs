using FruitsShopBackend.Constants;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using FruitsShopBackend.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<bool> UpdateOrderStatus(string orderId, string userId, OrderStatus status)
        {
            var order = await _orderRepository.GetOrderById(orderId, userId);
            if (order == null) return false;

            var updateOrderDto = new UpdateOrderDto
            {
                ShippingAddressId = order.ShippingAddress.AddressId, // Assuming ShippingAddress has an AddressId
                DiscountAmount = order.DiscountAmount,
                OrderStatus = status,
                PaymentStatus = order.PaymentStatus,
                PaymentDate = order.PaymentDate,
                PaymentMethod = order.PaymentMethod,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    UserId = oi.UserId // Assuming each OrderItem has a UserId
                }).ToList()
            };

            if (status == OrderStatus.Received && order.PaymentMethod == PaymentMethod.PayAfterReceivedProduct)
            {
                updateOrderDto.PaymentStatus = PaymentStatus.Paid;
                updateOrderDto.PaymentDate = DateTime.UtcNow;
            }

            await _orderRepository.UpdateOrder(orderId, userId, updateOrderDto);
            return true;
        }

        public async Task<bool> ProcessRefund(string orderId, string userId)
        {
            var order = await _orderRepository.GetOrderById(orderId, userId);
            if (order == null || order.PaymentStatus != PaymentStatus.Paid) return false;

            var updateOrderDto = new UpdateOrderDto
            {
                ShippingAddressId = order.ShippingAddress.AddressId,
                DiscountAmount = order.DiscountAmount,
                OrderStatus = order.OrderStatus,
                PaymentStatus = PaymentStatus.Refund,
                PaymentDate = order.PaymentDate,
                PaymentMethod = order.PaymentMethod,
                OrderItems = order.OrderItems.Select(oi => new OrderItemDto
                {
                    ProductId = oi.ProductId,
                    Quantity = oi.Quantity,
                    UserId = oi.UserId
                }).ToList()
            };

            await _orderRepository.UpdateOrder(orderId, userId, updateOrderDto);
            return true;
        }

    }
}
