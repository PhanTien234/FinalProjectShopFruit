using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UsersController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetAllUsers()
        {
            var users = await _userService.GetAllUsers();
            var userDtos = _mapper.Map<List<UserDto>>(users);
            return Ok(userDtos);
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<UserDto>> GetUserById(string userId)
        {
            var user = await _userService.GetUserById(userId);
            if (user == null)
            {
                return NotFound();
            }
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser([FromForm] UserCreateDto userCreateDto)
        {
            var createdUser = await _userService.CreateUser(userCreateDto);
            var userDto = _mapper.Map<UserDto>(createdUser);
            return Ok(new { Message = "User created successfully.", Data = userDto });
        }


        [HttpPut("{userId}")]
        public async Task<ActionResult<UserDto>> UpdateUser(string userId, [FromForm] UserUpdateDto userUpdateDto)
        {
            var updatedUser = await _userService.UpdateUser(userId, userUpdateDto);
            if (updatedUser == null)
            {
                return NotFound();
            }

            var userDto = _mapper.Map<UserDto>(updatedUser);
            return Ok(new { Message = "User updated successfully.", Data = userDto });
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(string userId)
        {
            await _userService.DeleteUser(userId);
            return Ok(new { Message = "User deleted successfully." });
        }
    }
}
