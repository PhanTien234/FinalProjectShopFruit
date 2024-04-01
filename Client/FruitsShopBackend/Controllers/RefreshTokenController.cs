using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FruitsShopBackend.Controllers
{
    public class RefreshTokenController : ControllerBase
    {
        private readonly IAuthService _authService;

        public RefreshTokenController(IAuthService authService)
        {
            _authService = authService;
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
    }
}
