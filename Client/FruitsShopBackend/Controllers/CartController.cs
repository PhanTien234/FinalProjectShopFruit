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
using FruitsShopBackend.Model;

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
            return Ok();
        }

        [HttpPut]
        public async Task<IActionResult> UpdateCart([FromBody] CartDto cartDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            if (cartDto.UserId != userId)
            {
                return Forbid(); // Return 403 Forbidden if the cart does not belong to the user
            }

            await _cartService.UpdateCart(cartDto);
            return Ok();
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
