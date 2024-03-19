using AutoMapper;
using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;
        private readonly IMapper _mapper;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly ICategoryService _categoryService;
        private readonly MongoDbContext _context;


        public ProductService(IProductRepository productRepository, IMapper mapper, ICloudinaryService cloudinaryService, ICategoryService categoryService, MongoDbContext context)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _cloudinaryService = cloudinaryService;
            _categoryService = categoryService;
            _context = context;
        }

        public async Task<List<ProductDto>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProducts();
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto> GetProductById(string productId)
        {
            var product = await _productRepository.GetProductById(productId);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto> CreateProduct(ProductCreateUpdateDto productDto)
        {
            if (productDto.Image != null)
            {
                // Upload image to Cloudinary
                var cloudinaryResult = await _cloudinaryService.UploadImageAsync(productDto.Image);

                // Set CloudImage details
                productDto.CloudImage = new CloudImage
                {
                    ImageId = cloudinaryResult.ImageId,
                    ImagePath = cloudinaryResult.ImagePath
                };

                var cloudImage = new CloudImage
                {
                    ImageId = cloudinaryResult.ImageId,
                    ImagePath = cloudinaryResult.ImagePath
                };
                await _context.CloudImages.InsertOneAsync(cloudImage);

            }
            // Fetch category details based on CategoryId
            var category = await _categoryService.GetCategoryById(productDto.CategoryId);
            if (category == null)
            {
                // Handle case where category is not found
                // You can return an error response or handle it as per your application's logic
                return null;
            }
            // Map DTO to Model
            var product = _mapper.Map<Product>(productDto);

            // Assign category to the product
            product.Category = category;
            var createdProduct = await _productRepository.CreateProduct(product);
            return _mapper.Map<ProductDto>(createdProduct);
        }

        public async Task<ProductDto> UpdateProduct(string productId, ProductCreateUpdateDto productDto)
        {
            // Fetch the existing product by ID
            var existingProduct = await _productRepository.GetProductById(productId);
            if (existingProduct == null)
            {
                // Handle case where the product with the given ID does not exist
                // You can return an error response or handle it as per your application's logic
                return null;
            }
            // Update product properties with new data
            existingProduct.Name = productDto.Name;
            existingProduct.Description = productDto.Description;
            existingProduct.Price = productDto.Price;
            existingProduct.OverallRating = productDto.OverallRating;
            existingProduct.AvailableQuantity = productDto.AvailableQuantity;
            existingProduct.SupplierId = productDto.SupplierId;
            existingProduct.IsCertificate = productDto.IsCertificate;

            // Check if a new image is provided
            if (productDto.Image != null)
            {
                // Upload the new image to Cloudinary
                var cloudinaryResult = await _cloudinaryService.UploadImageAsync(productDto.Image);

                // Set CloudImage details for the product
                existingProduct.CloudImage = new CloudImage
                {
                    ImageId = cloudinaryResult.ImageId,
                    ImagePath = cloudinaryResult.ImagePath
                };

                // Optionally, you can update CloudImage collection as well if needed
                var cloudImage = new CloudImage
                {
                    ImageId = cloudinaryResult.ImageId,
                    ImagePath = cloudinaryResult.ImagePath
                };
                await _context.CloudImages.InsertOneAsync(cloudImage);
            }

            // Fetch category details based on CategoryId
            var category = await _categoryService.GetCategoryById(productDto.CategoryId);
            if (category == null)
            {
                // Handle case where category is not found
                // You can return an error response or handle it as per your application's logic
                return null;
            }

            // Assign the category to the product
            existingProduct.Category = category;

            // Update the product in the repository
            var updatedProduct = await _productRepository.UpdateProduct(productId, existingProduct);

            // Map the updated product to DTO and return
            return _mapper.Map<ProductDto>(updatedProduct);
        }

        public async Task DeleteProduct(string productId)
        {
            await _productRepository.DeleteProduct(productId);
        }
    }
}
