using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailVerificationController : ControllerBase
    {
        private readonly IEmailVerificationService _emailVerificationService;

        public EmailVerificationController(IEmailVerificationService emailVerificationService)
        {
            _emailVerificationService = emailVerificationService;
        }

        [HttpPost("send-code")]
        public async Task<IActionResult> SendVerificationCode([FromBody] SendVerificationCodeRequest request)
        {
            // Call service to send verification code
            var result = await _emailVerificationService.SendVerificationCodeAsync(request.Email);

            if (result.Success)
            {
                return Ok(new { Message = "Verification code sent successfully" });
            }
            else
            {
                return BadRequest(new { Error = result.Message });
            }
        }

        [HttpPost("verify-code")]
        public async Task<IActionResult> VerifyVerificationCode([FromBody] VerifyVerificationCodeRequest request)
        {
            // Call service to verify verification code
            var result = await _emailVerificationService.VerifyVerificationCodeAsync(request.Email, request.VerificationCode);

            if (result.Success)
            {
                return Ok(new { Message = "Verification code verified successfully" });
            }
            else
            {
                return BadRequest(new { Error = result.Message });
            }
        }
    }
}
