using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using FruitsShopBackend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FruitsShopBackend.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserAddressController : ControllerBase
    {
        private readonly IUserAddressService _addressService;
        private readonly IMapper _mapper;

        public UserAddressController(IUserAddressService addressService, IMapper mapper)
        {
            _addressService = addressService;
            _mapper = mapper;
        }

        [AllowAnonymous]
        [HttpGet("getalladdresss")]
        public async Task<ActionResult<List<Product>>> GetAllAddresses()
        {
            var addresses = await _addressService.GetAllAddressesAsync();
            return Ok(addresses);
        }


        [HttpGet("getalladdressbyuser")]
        public async Task<ActionResult<IEnumerable<AddressDto>>> GetAllAddressesByUserId()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var addresses = await _addressService.GetAllAddressesAsyncByUserId(userId);
            return Ok(addresses);
        }

        [HttpGet("{addressId}")]
        public async Task<ActionResult<AddressDto>> GetAddressById(string addressId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var address = await _addressService.GetAddressByIdAsync(userId, addressId);
            if (address == null)
                return NotFound();

            return Ok(address);
        }

        [HttpPost]
        public async Task<ActionResult<AddressDto>> CreateAddress(CreateAddressDto addressDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var createdAddress = await _addressService.CreateAddressAsync(userId, addressDto);
            return Ok(new { Message = "Create address successfully!", Data = createdAddress });
        }

        [HttpPut("{addressId}")]
        public async Task<ActionResult<AddressDto>> UpdateAddress(string addressId, UpdateAddressDto addressDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var updatedAddress = await _addressService.UpdateAddressAsync(userId, addressId, addressDto);
            if (updatedAddress == null)
                return NotFound();

            return Ok(new { Message = "Update address successfully!", Data = updatedAddress });
        }

        [HttpDelete("{addressId}")]
        public async Task<ActionResult> DeleteAddress(string addressId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var result = await _addressService.DeleteAddressAsync(userId, addressId);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
