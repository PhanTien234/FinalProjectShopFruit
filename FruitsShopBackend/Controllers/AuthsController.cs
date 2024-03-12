using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FruitsShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthsController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthsController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
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

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest loginRequest)
        {
            // Call the login service method
            var result = await _authService.LoginAsync(loginRequest.Email, loginRequest.Password);

            if (result.Success)
            {
                // Authentication successful, return OK response with token or any other data
                return Ok(new { Message = "Login successful!" });
            }
            else
            {
                // Authentication failed, return BadRequest with error message
                return BadRequest(new { Error = result.Message });
            }
        }
    }
}
