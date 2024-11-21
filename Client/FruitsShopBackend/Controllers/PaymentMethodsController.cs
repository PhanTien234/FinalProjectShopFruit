using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Controllers
{
    [Route("api/[controller]")]
    public class PaymentMethodsController : ControllerBase
    {
        private readonly IPaymentMethodService _paymentMethodService;

        public PaymentMethodsController(IPaymentMethodService paymentMethodService)
        {
            _paymentMethodService = paymentMethodService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PaymentMethodDto>>> GetAllPaymentMethods()
        {
            var paymentMethods = await _paymentMethodService.GetAllPaymentMethods();
            return Ok(paymentMethods);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PaymentMethodDto>> GetPaymentMethodById(string id)
        {
            var paymentMethod = await _paymentMethodService.GetPaymentMethodById(id);
            if (paymentMethod == null)
            {
                return NotFound(new { Error = "Payment Method not found." });
            }
            return Ok(paymentMethod);
        }

        [HttpPost]
        public async Task<IActionResult> CreatePaymentMethod(PaymentMethodCreateUpdateDto paymentMethodDto)
        {
            var createdPaymentMethod = await _paymentMethodService.CreatePaymentMethod(paymentMethodDto);
            return Ok(new { Message = "Payment Method created successfully.", Data = createdPaymentMethod });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePaymentMethod(string id, PaymentMethodCreateUpdateDto paymentMethodDto)
        {
            await _paymentMethodService.UpdatePaymentMethod(id, paymentMethodDto);
            return Ok(new { Message = "Payment Method updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePaymentMethod(string id)
        {
            await _paymentMethodService.DeletePaymentMethod(id);
            return Ok(new { Message = "Payment Method deleted successfully." });
        }
    }
}
