using AutoMapper;
using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using FinalProjectFruitShopAdmin.Interfaces.IServices;

namespace FinalProjectFruitShopAdmin.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly ICategoryRepository _categoryRepository;
        private readonly ICloudinaryService _cloudinaryService;
        private readonly IMapper _mapper;

        public CategoryService(ICategoryRepository categoryRepository, IMapper mapper, ICloudinaryService cloudinaryService)
        {
            _categoryRepository = categoryRepository;
            _cloudinaryService = cloudinaryService;
            _mapper = mapper;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategories()
        {
            var categories = await _categoryRepository.GetAllCategories();
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task<CategoryDto> GetCategoryById(string id)
        {
            var category = await _categoryRepository.GetCategoryById(id);
            return _mapper.Map<CategoryDto>(category);
        }

        public async Task<CategoryDto> CreateCategory(CategoryCreateUpdateDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            // Handle image upload
            if (categoryDto.Image != null)
            {
                var result = await _cloudinaryService.UploadImageAsync(categoryDto.Image);
                category.CloudImage = new CloudImage
                {
                    ImageId = result.ImageId,
                    ImagePath = result.ImagePath
                };
            }
            category.CreatedAt = DateTime.UtcNow;
            var createdCategory = await _categoryRepository.CreateCategory(category);
            return _mapper.Map<CategoryDto>(createdCategory);
        }

        public async Task UpdateCategory(string id, CategoryCreateUpdateDto categoryDto)
        {
            var category = _mapper.Map<Category>(categoryDto);
            // Handle image upload
            if (categoryDto.Image != null)
            {
                var result = await _cloudinaryService.UploadImageAsync(categoryDto.Image);
                category.CloudImage = new CloudImage
                {
                    ImageId = result.ImageId,
                    ImagePath = result.ImagePath
                };
            }
            await _categoryRepository.UpdateCategory(id, category);
        }

        public async Task DeleteCategory(string id)
        {
            await _categoryRepository.DeleteCategory(id);
        }
    }
}
