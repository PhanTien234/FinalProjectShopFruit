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
                return Ok(new { Message = "Sign up successfully!" , Token = result.Data });
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
                return Ok(new { Message = "Login successful!", Token = result.Data});
            }
            else
            {
                // Authentication failed, return BadRequest with error message
                return BadRequest(new { Error = result.Message });
            }
        }

        [HttpPost("refreshtoken")]
        public async Task<IActionResult> RefreshToken([FromBody] TokenRefreshRequest request)
        {
            var result = await _authService.RefreshTokenAsync(request.RefreshToken, request.UserId);

            if (result.Success)
            {
                return Ok(new { Message = "Token refreshed successfully!", Token = result.Data });
            }
            else
            {
                return BadRequest(new { Error = result.Message });
            }
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout([FromBody] LogoutRequest logoutRequest)
        {
            var result = await _authService.LogoutAsync(logoutRequest.UserId);
            if (result.Success)
            {
                return Ok(new { Message = result.Message });
            }
            else
            {
                return BadRequest(new { Error = result.Message });
            }
        }
    }
}
