using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly ICloudinaryService _cloudinaryService;

        public ProductController(IProductService productService, ICloudinaryService cloudinaryService)
        {
            _productService = productService;
            _cloudinaryService = cloudinaryService;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDto>>> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("{productId}")]
        public async Task<ActionResult<ProductDto>> GetProductById(string productId)
        {
            var product = await _productService.GetProductById(productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromForm] ProductCreateUpdateDto productDto)
        {

            var createdProduct = await _productService.CreateProduct(productDto);
            return Ok(new { Message = "Category created successfully.", Data = createdProduct });
        }

        [HttpPut("{productId}")]
        public async Task<ActionResult<ProductDto>> UpdateProduct(string productId, [FromForm] ProductCreateUpdateDto productDto)
        {
            var updatedProduct = await _productService.UpdateProduct(productId, productDto);
            if (updatedProduct == null)
            {
                return NotFound();
            }
            return Ok(updatedProduct);
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(string productId)
        {
            await _productService.DeleteProduct(productId);
            return NoContent();
        }
    }
}
