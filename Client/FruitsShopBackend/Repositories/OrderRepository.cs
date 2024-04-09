using AutoMapper;
using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FruitsShopBackend.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly MongoDbContext _context;
        private readonly IMongoCollection<Order> _ordersCollection;
        private readonly IProductRepository _productRepository; 
        private readonly IUserAddressService _userAddressService;
        private readonly IMapper _mapper;

        public OrderRepository(MongoDbContext context, IProductRepository productRepository, IUserAddressService userAddressService, IMapper mapper)
        {
            _context = context;
            _ordersCollection = _context.Orders;
            _productRepository = productRepository; // Assigning the injected product repository
            _userAddressService = userAddressService;
            _mapper = mapper;
        }

        public async Task<List<Order>> GetAllOrdersByUserId(string userId)
        {
            return await _ordersCollection.Find(o => o.UserId == userId).ToListAsync();
        }

        public async Task<Order> CreateOrder(string userId, CreateOrderDto orderDto)
        {
            var orderItems = new List<OrderItem>();

            foreach (var orderItemDto in orderDto.OrderItems)
            {
                var product = await _productRepository.GetProductById(orderItemDto.ProductId);
                if (product == null)
                {
                    throw new Exception($"Product with ID '{orderItemDto.ProductId}' not found.");
                }
                if(orderItemDto.Quantity <= 0) // Check if quantity is less than or equal to 0
                {
                    continue; // Skip this product and move to the next one
                }

                if (orderItemDto.Quantity > product.AvailableQuantity)
                {
                    throw new Exception($"Insufficient stock for product '{product.Name}'. Available quantity: {product.AvailableQuantity}");
                }

                // Deduct ordered quantity from available quantity
                product.AvailableQuantity -= orderItemDto.Quantity;
                await _productRepository.UpdateProduct(product.ProductId, product); // Update product quantity in the database

                orderItems.Add(new OrderItem
                {
                    ProductId = orderItemDto.ProductId,
                    Quantity = orderItemDto.Quantity,
                    PricePerUnit = product.Price
                });
            }


            // Fetch the entire shipping address using only the AddressId
            var shippingAddress = await _userAddressService.GetAddressByIdAsync(userId, orderDto.ShippingAddressId);
            if (shippingAddress == null)
            {
                throw new Exception("Shipping address not found.");
            }

            // Calculate TotalOrderValue
            decimal totalOrderValue = orderItems.Sum(oi => oi.Quantity * oi.PricePerUnit);

            // Calculate AmountPaid
            decimal amountPaid = totalOrderValue - orderDto.DiscountAmount;

            var order = new Order
            {
                UserId = userId,
                OrderDate = DateTime.Now,
                ShippingAddress = shippingAddress,
                DiscountAmount = orderDto.DiscountAmount,
                TotalOrderValue = totalOrderValue,
                AmountPaid = amountPaid,
                OrderStatus = orderDto.OrderStatus,
                PaymentStatus = orderDto.PaymentStatus,
                PaymentDate = orderDto.PaymentDate,
                PaymentMethod = orderDto.PaymentMethod,
                OrderItems = orderItems
            };

            await _ordersCollection.InsertOneAsync(order);
            return order;
        }

        public async Task<Order> GetOrderById(string orderId, string userId)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.OrderId, orderId) & Builders<Order>.Filter.Eq(o => o.UserId, userId);
            return await _ordersCollection.Find(filter).FirstOrDefaultAsync();
        }

        public async Task<Order> UpdateOrder(string orderId, string userId, UpdateOrderDto orderDto)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.OrderId, orderId) & Builders<Order>.Filter.Eq(o => o.UserId, userId);
            var order = await _ordersCollection.Find(filter).FirstOrDefaultAsync();

            if (order == null)
            {
                // Handle case where order is not found
                throw new Exception($"Order with ID '{orderId}' not found for user '{userId}'.");
            }
            // Fetch the entire shipping address using only the AddressId
            var shippingAddress = await _userAddressService.GetAddressByIdAsync(userId, orderDto.ShippingAddressId);
            if (shippingAddress == null)
            {
                throw new Exception("Shipping address not found.");
            }

            // Update order details
            order.ShippingAddress = shippingAddress;
            order.DiscountAmount = orderDto.DiscountAmount;
            order.OrderStatus = orderDto.OrderStatus;
            order.PaymentStatus = orderDto.PaymentStatus;
            order.PaymentDate = orderDto.PaymentDate;
            order.PaymentMethod = orderDto.PaymentMethod;

            // Update order items
            foreach (var updatedOrderItem in orderDto.OrderItems)
            {
                var existingOrderItem = order.OrderItems.FirstOrDefault(oi => oi.ProductId == updatedOrderItem.ProductId);
                if (existingOrderItem != null)
                {
                    // Deduct the difference in quantity from the available quantity of the product
                    var product = await _productRepository.GetProductById(existingOrderItem.ProductId);
                    var quantityDifference = updatedOrderItem.Quantity - existingOrderItem.Quantity;
                    if (quantityDifference > product.AvailableQuantity)
                    {
                        throw new Exception($"Insufficient stock for product '{product.Name}'. Available quantity: {product.AvailableQuantity}");
                    }
                    product.AvailableQuantity -= quantityDifference;
                    await _productRepository.UpdateProduct(product.ProductId, product);

                    // Update the order item's quantity
                    existingOrderItem.Quantity = updatedOrderItem.Quantity;
                }
            }

            // Calculate TotalOrderValue
            decimal totalOrderValue = orderDto.OrderItems.Sum(oi => oi.Quantity * oi.PricePerUnit);

            // Calculate AmountPaid
            decimal amountPaid = totalOrderValue - orderDto.DiscountAmount;
            order.TotalOrderValue = totalOrderValue;
            order.AmountPaid = amountPaid;
            // Update the order in the database
            var options = new FindOneAndReplaceOptions<Order>
            {
                ReturnDocument = ReturnDocument.After
            };
            return await _ordersCollection.FindOneAndReplaceAsync(filter, order, options);
        }

        public async Task DeleteOrder(string orderId, string userId)
        {
            var filter = Builders<Order>.Filter.Eq(o => o.OrderId, orderId) & Builders<Order>.Filter.Eq(o => o.UserId, userId);
            var order = await _ordersCollection.FindOneAndDeleteAsync(filter);

            if (order == null)
            {
                // Handle case where order is not found or not deleted
                throw new Exception($"Failed to delete order with ID '{orderId}' for user '{userId}'.");
            }
            else
            {
                // Order successfully deleted, handle inventory adjustment
                foreach (var orderItem in order.OrderItems)
                {
                    var product = await _productRepository.GetProductById(orderItem.ProductId);
                    if (product != null)
                    {
                        product.AvailableQuantity += orderItem.Quantity;
                        await _productRepository.UpdateProduct(product.ProductId, product);
                    }
                }
            }
        }

        public async Task<List<Order>> GetAllOrders()
        {
            return await _ordersCollection.Find(o => true).ToListAsync();
        }
    }
}
