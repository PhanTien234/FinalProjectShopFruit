using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UnitFruitsController : ControllerBase
    {
        private readonly IUnitFruitService _unitFruitService;

        public UnitFruitsController(IUnitFruitService unitFruitService)
        {
            _unitFruitService = unitFruitService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UnitFruitDto>>> GetAllUnitFruits()
        {
            var unitFruits = await _unitFruitService.GetAllUnitFruits();
            return Ok(unitFruits);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UnitFruitDto>> GetUnitFruitById(string id)
        {
            var unit = await _unitFruitService.GetUnitFruitById(id);
            if (unit == null)
            {
                return NotFound(new { Error = "Unit not found." });
            }
            return Ok(unit);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUnitFruit(UnitFruitCreateUpdateDto unitFruitDto)
        {
            var createdUnitFruit = await _unitFruitService.CreateUnitFruit(unitFruitDto);
            return Ok(new { Message = "Unit created successfully.", Data = createdUnitFruit });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUnitFruit(string id, UnitFruitCreateUpdateDto unitFruitDto)
        {
            await _unitFruitService.UpdateUnitFruit(id, unitFruitDto);
            return Ok(new { Message = "Unit updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUnitFruit(string id)
        {
            await _unitFruitService.DeleteUnitFruit(id);
            return Ok(new { Message = "Unit deleted successfully." });
        }
    }
}
