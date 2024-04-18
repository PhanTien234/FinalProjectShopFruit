using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace FruitsShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Require authorization for all actions in this controller
    public class SupplierController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SupplierController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [AllowAnonymous]
        [HttpGet("getallsuppliers")]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> GetAllSuppliers()
        {
            var suppliers = await _supplierService.GetAllSuppliers();
            return Ok(suppliers);
        }

        [HttpGet("getallsuppliersbyuser")]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> GetAllSuppliersByUser()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var suppliers = await _supplierService.GetAllSuppliersByUser(userId);
            return Ok(suppliers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplierDto>> GetSupplierById(string id)
        {
            var supplier = await _supplierService.GetSupplierById(id);
            if (supplier == null)
            {
                return NotFound();
            }
            return Ok(supplier);
        }

        [HttpPost]
        public async Task<ActionResult<SupplierDto>> CreateSupplier([FromForm] SupplierCreateDto supplierDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            try
            {
                var createdSupplier = await _supplierService.CreateSupplier(userId, supplierDto);
                return Ok(new { Message = "Supplier created successfully.", Data = createdSupplier });
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to create supplier: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<SupplierDto>> UpdateSupplier(string id, [FromForm] SupplierUpdateDto supplierDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            try
            {
                var updatedSupplier = await _supplierService.UpdateSupplier(userId, id, supplierDto);
                if (updatedSupplier == null)
                {
                    return NotFound();
                }
                return Ok(updatedSupplier);
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to update supplier: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(string id)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            try
            {
                await _supplierService.DeleteSupplier(userId, id);
                return Ok(new { Message = "Supplier deleted successfully." });
            }
            catch (Exception ex)
            {
                return BadRequest($"Failed to delete supplier: {ex.Message}");
            }
        }
    }
}
