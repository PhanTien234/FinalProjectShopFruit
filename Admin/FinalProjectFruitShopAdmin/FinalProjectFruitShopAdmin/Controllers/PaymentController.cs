using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using System;

namespace FinalProjectFruitShopAdmin.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentController : ControllerBase
    {
        private readonly IPayPalService _payPalService;

        public PaymentController(IPayPalService payPalService)
        {
            _payPalService = payPalService;
        }

        [HttpPost("create-order")]
        public async Task<IActionResult> CreateOrder([FromForm] decimal amount)
        {
            try
            {
                var response = await _payPalService.CreateOrder(amount);
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error creating PayPal order: {ex.Message}");
            }
        }

        [HttpPost("send-payment")]
        public async Task<IActionResult> SendPayment([FromBody] SendPaymentDto paymentDto)
        {
            try
            {
                await _payPalService.SendPayment(paymentDto.RecipientEmail, paymentDto.Amount);
                return Ok("Payment sent successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error sending payment: {ex.Message}");
            }
        }

        [HttpPost("setup-seller-paypal-account/{userId}")]
        public async Task<IActionResult> SetupSellerPayPalAccount([FromBody] SellerPayPalAccountDto accountDto)
        {
            try
            {
                await _payPalService.SetupSellerPayPalAccount(accountDto);
                return Ok("Seller PayPal account setup successful.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error setting up seller PayPal account: {ex.Message}");
            }
        }

        [HttpGet("seller-paypal-account/{userId}")]
        public async Task<IActionResult> GetSellerPayPalByUserId(string userId)
        {
            try
            {
                var sellerPayPalAccount = await _payPalService.GetSellerPayPalByUserId(userId);
                return Ok(sellerPayPalAccount);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error retrieving seller PayPal account: {ex.Message}");
            }
        }

    }
}
