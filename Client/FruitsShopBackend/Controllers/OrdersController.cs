using Amazon.Runtime.Internal;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Threading.Tasks;
using System;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Http;
using FruitsShopBackend.Constants;

namespace FruitsShopBackend.Controllers
{
    [Authorize] // Requires authorization for all endpoints in this controller
    [ApiController]
    [Route("api/[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        [HttpGet]
        public async Task<ActionResult<Order>> GetAllOrdersByUserId()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var orders = await _orderService.GetAllOrdersByUserId(userId);
            return Ok(new { Message = "Orders retrieved successfully.", Data = orders });
        }

        [HttpGet("{orderId}")]
        public async Task<ActionResult<Order>> GetOrderById(string orderId)
        {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var order = await _orderService.GetOrderById(orderId, userId);
                if (order == null)
                {
                    return NotFound($"Order with ID '{orderId}' not found.");
                }
                return Ok(new { Message = "Order retrieved successfully.", Data = order });
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
        {
   
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var order = await _orderService.CreateOrder(userId, orderDto);
                return Ok(new { Message = "Order retrieved successfully.", Data = order });

        }

        [HttpPut("{orderId}")]
        public async Task<ActionResult<Order>> UpdateOrder( string orderId, UpdateOrderDto orderDto)
        {

            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier);
            var updatedOrder = await _orderService.UpdateOrder(orderId, userId, orderDto);
                return Ok(new { Message = "Order updated successfully.", Data = updatedOrder });
        }

        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder(string orderId)
        {
                var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                await _orderService.DeleteOrder(orderId, userId);
                return NoContent();
        }

        [HttpPut("updateStatus/{orderId}")]
        public async Task<IActionResult> UpdateOrderStatus(string orderId, [FromBody] StatusUpdateDto updateDto)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            bool success = await _orderService.UpdateOrderStatus(orderId, userId, updateDto.Status);
            if (!success) return NotFound("Order not found or unable to update status.");
            return Ok(new { Message = "Update Order Status successfully!"});
        }

        [HttpPost("refund/{orderId}")]
        public async Task<IActionResult> ProcessRefund(string orderId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            bool success = await _orderService.ProcessRefund(orderId, userId);
            if (!success) return NotFound("Refund failed. Order not found or not eligible for refund.");
            return Ok(new { Message = "Refurn Order to Buyer successfully!" });
        }
    }
}
