using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using System.Security.Claims;


namespace FruitsShopBackend.Controllers
{
    [Authorize] // Apply authorization to the entire controller
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult<CartDto>> GetUserCart()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var cart = await _cartService.GetUserCart(userId);
            if (cart == null)
            {
                return NotFound();
            }
            return Ok(cart);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddToCart([FromBody] AddToCartDto addToCartDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            await _cartService.AddToCart(userId, addToCartDto.ProductId);
            // Retrieve the updated cart after adding the item
            var cart = await _cartService.GetUserCart(userId);
            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

        [HttpPut("updateCartItem")]
        public async Task<IActionResult> UpdateCartItem([FromBody] UpdateCartDto updateCartItemDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            await _cartService.UpdateCart(userId, updateCartItemDto);

            // Retrieve the updated cart after updating the cart item
            var updatedCart = await _cartService.GetUserCart(userId);
            if (updatedCart == null)
            {
                return NotFound();
            }

            return Ok(updatedCart);
        }

        [HttpDelete("remove/{productId}")]
        public async Task<IActionResult> RemoveFromCart(string productId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            await _cartService.RemoveFromCart(userId, productId);
            return NoContent();
        }
    }
}
