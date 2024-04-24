using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FruitsShopBackend.Services
{
    public class CartService : ICartService
    {
        private readonly ICartRepository _cartRepository;
        private readonly IProductService _productService;
        private readonly IMapper _mapper;

        public CartService(ICartRepository cartRepository, IMapper mapper, IProductService productService)
        {
            _cartRepository = cartRepository;
            _mapper = mapper;
            _productService = productService;
        }

        public async Task<CartDto> GetUserCart(string userId)
        {
            var cart = await _cartRepository.GetCartByUserId(userId);
            return _mapper.Map<CartDto>(cart);
        }

        public async Task AddToCart(string userId, string productId)
        {
            var cart = await _cartRepository.GetCartByUserId(userId);

            if (cart == null)
            {
                cart = new Cart { UserId = userId, CartId = ObjectId.GenerateNewId().ToString(), Items = new List<CartItem>() };
            }

            // Fetch product details from the Product API based on the productId
            var product = await _productService.GetProductById(productId);

            if (product == null)
            {
                // Handle case where product with the given ID does not exist
                // You can return an error response or handle it as per your application's logic
                return;
            }

            var existingItem = cart.Items.FirstOrDefault(item => item.ProductId == productId);

            if (existingItem != null)
            {
                existingItem.Quantity++;
            }
            else
            {
                var newItem = new CartItem
                {
                    ProductId = productId,
                    Name = product.Name,
                    Description = product.Description,
                    DiscountPrice = product.DiscountPrice,
                    Price = product.Price,
                    Quantity = 1,
                    ImageUrl = product.CloudImage.ImagePath // Assuming CloudImage contains image information
                };
                cart.Items.Add(newItem);
            }

            await _cartRepository.UpdateCart(cart);
        }

        public async Task UpdateCart(string userId, UpdateCartDto updateCartItemDto)
        {
            var cart = await _cartRepository.GetCartByUserId(userId);

            if (cart != null)
            {
                var cartItem = cart.Items.FirstOrDefault(item => item.ProductId == updateCartItemDto.ProductId);

                if (cartItem != null)
                {
                    cartItem.Quantity = updateCartItemDto.Quantity;
                    await _cartRepository.UpdateCart(cart);
                }
            }
        }

        public async Task RemoveFromCart(string userId, string productId)
        {
            var cart = await _cartRepository.GetCartByUserId(userId);

            if (cart != null)
            {
                var itemToRemove = cart.Items.FirstOrDefault(item => item.ProductId == productId);

                if (itemToRemove != null)
                {
                    cart.Items.Remove(itemToRemove);
                    await _cartRepository.UpdateCart(cart);
                }
            }
        }
    }
}
