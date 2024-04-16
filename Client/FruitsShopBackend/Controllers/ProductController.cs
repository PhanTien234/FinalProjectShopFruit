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

        [HttpGet("getallproducts")]
        public async Task<ActionResult<List<Product>>> GetAllProducts()
        {
            var products = await _productService.GetAllProducts();
            return Ok(products);
        }

        [HttpGet("getallproductsbyuser")]
        public async Task<ActionResult<List<ProductDto>>> GetAllProductsByUserId()
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var products = await _productService.GetAllProductsByUserId(userId);
            return Ok(products);
        }
        [AllowAnonymous]
        [HttpGet("{productId}")]
        public async Task<ActionResult<ProductDto>> GetProductById(string productId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var product = await _productService.GetProductById(userId, productId);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        [HttpPost]
        public async Task<ActionResult<ProductDto>> CreateProduct([FromForm] ProductCreateUpdateDto productDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var createdProduct = await _productService.CreateProduct(userId, productDto);
            return Ok(new { Message = "Product created successfully.", Data = createdProduct });
        }

        [HttpPut("{productId}")]
        public async Task<ActionResult<ProductDto>> UpdateProduct(string productId, [FromForm] ProductCreateUpdateDto productDto)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            var updatedProduct = await _productService.UpdateProduct(userId, productId, productDto);
            if (updatedProduct == null)
            {
                return NotFound();
            }
            return Ok(updatedProduct);
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(string productId)
        {
            var userId = HttpContext.User.FindFirstValue(ClaimTypes.NameIdentifier); // Retrieve user ID from the token
            await _productService.DeleteProduct(userId, productId);
            return NoContent();
        }
    }
}
