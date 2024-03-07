using FruitsShopBackend.Dtos;
using FruitsShopBackend.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FruitsShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IAuthService _authService;

        public RegisterController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            var result = await _authService.RegisterAsync(request);

            if (result.Success)
            {
                return Ok(new { Message = "Sign up successfully!" });
            }
            else
            {
                return BadRequest(new { Error = result.Message });
            }
        }
    }
}
