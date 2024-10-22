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
        private readonly ISupplierService _supplierService;
        private readonly IUnitFruitService _unitFruitService;
        private readonly MongoDbContext _context;


        public ProductService(IProductRepository productRepository, IMapper mapper, ICloudinaryService cloudinaryService, ICategoryService categoryService, MongoDbContext context, ISupplierService supplierService, IUnitFruitService unitFruitService)
        {
            _productRepository = productRepository;
            _mapper = mapper;
            _cloudinaryService = cloudinaryService;
            _categoryService = categoryService;
            _context = context;
            _supplierService = supplierService;
            _unitFruitService = unitFruitService;
        }

        public async Task<List<ProductDto>> GetAllProducts()
        {
            var products = await _productRepository.GetAllProducts();
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<List<ProductDto>> GetAllProductsByUserId(string userId)
        {
            var products = await _productRepository.GetAllProductsByUserId(userId);
            return _mapper.Map<List<ProductDto>>(products);
        }

        public async Task<ProductDto> GetProductById(string productId)
        {
            var product = await _productRepository.GetProductById(productId);
            return _mapper.Map<ProductDto>(product);
        }

        public async Task<ProductDto> CreateProduct(string userId, ProductCreateUpdateDto productDto)
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
            // Fetch supplier details based on SupplierId
            var supplier = await _supplierService.GetSupplierById(productDto.SupplierId);
            if (supplier == null)
            {
                // Handle case where supplier is not found
                // You can return an error response or handle it as per your application's logic
                return null;
            }
            // Fetch unit details based on UnitFruitId
            var unit = await _unitFruitService.GetUnitFruitById(productDto.UnitFruitId);
            if (unit == null)
            {
                // Handle case where unit is not found
                // You can return an error response or handle it as per your application's logic
                return null;
            }

            if (!string.IsNullOrEmpty(productDto.SupplierId))
            {
                productDto.IsCertificate = true;
            }
            else
            {
                productDto.IsCertificate = false;
            }
            // Map DTO to Model
            var product = _mapper.Map<Product>(productDto);

            // Assign category to the product
            product.Supplier = supplier;
            product.Category = category;
            product.UnitFruit = unit;
            // Set the user ID for the product
            product.UserId = userId;
            var createdProduct = await _productRepository.CreateProduct(userId, product);
            return _mapper.Map<ProductDto>(createdProduct);
        }

        public async Task<ProductDto> UpdateProduct(string userId, string productId, ProductCreateUpdateDto productDto)
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
            existingProduct.DiscountPrice = productDto.DiscountPrice;
            existingProduct.Price = productDto.Price;
            existingProduct.OverallRating = productDto.OverallRating;
            existingProduct.AvailableQuantity = productDto.AvailableQuantity;

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
            // Fetch supplier details based on SupplierId
            var supplier = await _supplierService.GetSupplierById(productDto.SupplierId);
            if (supplier == null)
            {
                // Handle case where supplier is not found
                // You can return an error response or handle it as per your application's logic
                return null;
            }
            // Fetch unit details based on UnitFruitId
            var unit = await _unitFruitService.GetUnitFruitById(productDto.UnitFruitId);
            if (unit == null)
            {
                // Handle case where unit is not found
                // You can return an error response or handle it as per your application's logic
                return null;
            }

            // Check if SupplierId is provided
            if (!string.IsNullOrEmpty(productDto.SupplierId))
            {
                productDto.IsCertificate = true;
            }
            else
            {
                productDto.IsCertificate = false;
            }
            // Assign the category to the product
            existingProduct.Supplier = supplier;
            existingProduct.Category = category;
            existingProduct.UnitFruit = unit;

            // Update the product in the repository
            var updatedProduct = await _productRepository.UpdateProduct(userId, productId, existingProduct);

            // Map the updated product to DTO and return
            return _mapper.Map<ProductDto>(updatedProduct);
        }

        public async Task DeleteProduct(string userId, string productId)
        {
            await _productRepository.DeleteProduct(userId, productId);
        }
    }
}
