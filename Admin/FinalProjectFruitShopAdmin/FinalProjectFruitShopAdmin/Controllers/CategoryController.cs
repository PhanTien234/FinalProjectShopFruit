using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetAllCategories()
        {
            var categories = await _categoryService.GetAllCategories();
            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategoryById(string id)
        {
            var category = await _categoryService.GetCategoryById(id);
            if (category == null)
            {
                return NotFound(new { Error = "Category not found." });
            }
            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> CreateCategory([FromForm] CategoryCreateUpdateDto categoryDto)
        {
            var createdCategory = await _categoryService.CreateCategory(categoryDto);
            return Ok(new { Message = "Category created successfully.", Data = createdCategory });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(string id, [FromForm] CategoryCreateUpdateDto categoryDto)
        {
            await _categoryService.UpdateCategory(id, categoryDto);
            return Ok(new { Message = "Category updated successfully." });
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(string id)
        {
            await _categoryService.DeleteCategory(id);
            return Ok(new { Message = "Category deleted successfully." });
        }
    }
}
