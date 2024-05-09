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
        private readonly IProductRepository _productRepository;
        private readonly IOrderRepository _orderRepository;
        private readonly IMailService _mailService;
        private readonly IUserService _userService;
        public OrderService(IOrderRepository orderRepository, IMailService mailService, IUserService userService)
        {
            _orderRepository = orderRepository;
            _mailService = mailService;
            _userService = userService;
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
            var order = await _orderRepository.CreateOrder(userId, orderDto);
            await SendOrderNotificationToBuyer(order);
            await SendOrderNotificationToSeller(order);
            return order;
        }

        public async Task<Order> GetOrderById(string orderId, string userId)
        {
            var order = await _orderRepository.GetOrderById(orderId, userId);
            await SendOrderNotificationToBuyer(order);
            return order;
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

        private async Task SendOrderNotificationToBuyer(Order order)
        {
            var subject = "Your Order from FruitsShop";
            var body = GenerateBuyerOrderEmailBody(order);
            await _mailService.SendEmailAsync(order.UserId, subject, body);
        }

        private async Task SendOrderNotificationToSeller(Order order)
        {
            foreach (var orderItem in order.OrderItems)
            {
                var product = await _productRepository.GetProductById(orderItem.ProductId);
                var seller = await _userService.GetUserById(product.UserId); // Fetch seller details
                var sellerEmail = seller.Email; // Get the seller's email
                var subject = "New Order Sold";
                var body = GenerateSellerOrderEmailBody(order);
                await _mailService.SendEmailAsync(sellerEmail, subject, body);
            }
        }

        private string GenerateBuyerOrderEmailBody(Order order)
        {
            // Generate HTML body for the buyer's email using order details
            // Include placeholders for orderId, orderDate, shippingAddress, etc.
            // Replace placeholders with actual order details
            // Return the HTML content as a string
            return $@"
                <html>
                    <body>
                        <h2>Order Details</h2>
                        <p>Order ID: {order.OrderId}</p>
                        <p>Order Date: {order.OrderDate}</p>
                        <p>Shipping Address: {order.ShippingAddress}</p>
                        <p>Total Order Value: {order.TotalOrderValue}</p>
                        <p>Discount Amount: {order.DiscountAmount}</p>
                        <p>Amount Paid: {order.AmountPaid}</p>
                        <p>Payment Method: {order.PaymentMethod}</p>
                    </body>
                </html>
            ";
        }

        private string GenerateSellerOrderEmailBody( Order order)
        {
            // Generate HTML body for the seller's email using order details
            // Include placeholders for orderId, orderDate, shippingAddress, etc.
            // Replace placeholders with actual order details
            // Return the HTML content as a string
            return $@"
                <html>
                    <body>
                        <h2>New Order Details</h2>
                        <p>Order ID: {order.OrderId}</p>
                        <p>Order Date: {order.OrderDate}</p>
                        <p>Shipping Address: {order.ShippingAddress}</p>
                        <p>Total Order Value: {order.TotalOrderValue}</p>
                        <p>Discount Amount: {order.DiscountAmount}</p>
                        <p>Amount Paid: {order.AmountPaid}</p>
                        <p>Payment Method: {order.PaymentMethod}</p>
                    </body>
                </html>
            ";
        }

        /* public async Task<bool> UpdateOrderStatus(string orderId, string userId, OrderStatus status)
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
         }*/

    }
}
