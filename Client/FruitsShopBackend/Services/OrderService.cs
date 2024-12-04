using AutoMapper;
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
        private readonly IProductRepository _productRepository;
        private readonly IUserAddressService _userAddressService;
        private readonly IPaymentMethodService _paymentMethodService;
        private readonly IMailService _mailService;
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IProductRepository productRepository, IUserAddressService userAddressService, 
            IPaymentMethodService paymentMethodService, IMapper mapper, IMailService mailService, IUserService userService)
        {
            _orderRepository = orderRepository;
            _productRepository = productRepository;
            _userAddressService = userAddressService;
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

        public async Task<OrderDto> CreateOrder(string userId, CreateOrderDto orderDto)
        {
            // Validate and process order items
            var orderItems = new List<OrderItem>();
            foreach (var orderItemDto in orderDto.OrderItems)
            {
                var product = await _productRepository.GetProductById(orderItemDto.ProductId);
                if (product == null) throw new Exception($"Product with ID '{orderItemDto.ProductId}' not found.");
                if (orderItemDto.Quantity <= 0) continue;
                if (orderItemDto.Quantity > product.AvailableQuantity)
                    throw new Exception($"Insufficient stock for product '{product.Name}'.");

                product.AvailableQuantity -= orderItemDto.Quantity;
                await _productRepository.UpdateProduct(product.UserId, product.ProductId, product);

                orderItems.Add(new OrderItem
                {
                    OrderItemId = Guid.NewGuid().ToString(),
                    ProductId = orderItemDto.ProductId,
                    Quantity = orderItemDto.Quantity,
                    Price = orderItemDto.Price,
                });
            }

            // Fetch payment method and shipping address
            var paymentMethod = await _paymentMethodService.GetPaymentMethodById(orderDto.PaymentMethodId)
                                ?? throw new Exception("Payment method not found.");
            var shippingAddress = await _userAddressService.GetAddressByIdAsync(userId, orderDto.ShippingAddressId)
                                 ?? throw new Exception("Shipping address not found.");
            // Determine payment status
            var paymentStatus = paymentMethod.Name.Contains("Pay after receiving the order")
                ? PaymentStatus.Unpaid
                : PaymentStatus.Paid;

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.Now,
                ShippingAddress = shippingAddress,
                TotalPrices = orderDto.TotalPrices,
                OrderStatus = OrderStatus.PrepareProducts,
                PaymentStatus = paymentStatus,
                PaymentDate = paymentStatus == PaymentStatus.Paid ? orderDto.PaymentDate : null, // Set PaymentDate only if paid
                PaymentMethod = paymentMethod,
                OrderItems = orderItems
            };

            // Insert order into database
            await _orderRepository.InsertOrder(order);
            return _mapper.Map<OrderDto>(order);
        }

        public async Task<OrderDto> GetOrderById(string orderId, string userId)
        {
            var order = await _orderRepository.GetOrderById(orderId, userId);
            return _mapper.Map<OrderDto>(order);
        }

        public async Task<OrderDto> UpdateOrder(string orderId, string userId, UpdateOrderDto orderDto)
        {
            var existingOrder = await _orderRepository.GetOrderById(orderId, userId)
                               ?? throw new Exception($"Order with ID '{orderId}' not found.");

            // Update order details
            var shippingAddress = await _userAddressService.GetAddressByIdAsync(userId, orderDto.ShippingAddressId)
                                 ?? throw new Exception("Shipping address not found.");

            existingOrder.ShippingAddress = shippingAddress;
            existingOrder.OrderStatus = orderDto.OrderStatus;
            existingOrder.PaymentStatus = orderDto.PaymentStatus;
            existingOrder.PaymentDate = orderDto.PaymentDate;

            // Update order in database
            var updatedOrder = await _orderRepository.UpdateOrder(existingOrder);
            return _mapper.Map<OrderDto>(updatedOrder);
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
