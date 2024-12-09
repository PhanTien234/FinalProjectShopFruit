using AutoMapper;
using FinalProjectFruitShopAdmin.Constants;
using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using FinalProjectFruitShopAdmin.Model;
using FinalProjectFruitShopAdmin.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IProductRepository _productRepository;
        private readonly IPaymentMethodService _paymentMethodService;
        private readonly IMailService _mailService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, 
            IPaymentMethodService paymentMethodService, IMapper mapper, IMailService mailService, IUserService userService)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _paymentMethodService = paymentMethodService;
            _mailService = mailService;
            _userService = userService;
            _mapper = mapper;
        }

        public async Task<List<OrderDto>> GetAllOrdersByUserId(string userId)
        {
            var orders = await _orderRepository.GetAllOrdersByUserId(userId);
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task<List<OrderDto>> GetAllOrders()
        {
            var orders = await _orderRepository.GetAllOrders();
            return _mapper.Map<List<OrderDto>>(orders);
        }

        public async Task<OrderDto> GetOrderById(string orderId, string userId)
        {
            var order = await _orderRepository.GetOrderById(orderId, userId);
            return _mapper.Map<OrderDto>(order);
        }

        public async Task DeleteOrder(string orderId, string userId)
        {
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
                 <p>Total Order Value: {order.TotalPrices}</p>
                 <p>Payment Method: {order.PaymentMethod}</p>
             </body>
         </html>
     ";
        }

        private string GenerateSellerOrderEmailBody(Order order)
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
                 <p>Total Order Value: {order.TotalPrices}</p>
                 <p>Payment Method: {order.PaymentMethod}</p>
             </body>
         </html>
     ";
        }




    }
}
