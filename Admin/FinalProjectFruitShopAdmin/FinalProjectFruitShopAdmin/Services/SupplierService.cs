using AutoMapper;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using FinalProjectFruitShopAdmin.Model;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using FinalProjectFruitShopAdmin.Dtos;

namespace FinalProjectFruitShopAdmin.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly ISupplierRepository _supplierRepository;
        private readonly IMapper _mapper;
        private readonly ICloudinaryService _cloudinaryService;

        public SupplierService(ISupplierRepository supplierRepository, IMapper mapper, ICloudinaryService cloudinaryService)
        {
            _supplierRepository = supplierRepository;
            _mapper = mapper;
            _cloudinaryService = cloudinaryService;
        }

        public async Task<IEnumerable<SupplierDto>> GetAllSuppliers()
        {

            var suppliers = await _supplierRepository.GetAllSuppliers();
            return _mapper.Map<IEnumerable<SupplierDto>>(suppliers);
        }

        public async Task<IEnumerable<SupplierDto>> GetAllSuppliersByUser(string userId)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            var suppliers = await _supplierRepository.GetAllSuppliersByUser(userId);
            return _mapper.Map<IEnumerable<SupplierDto>>(suppliers);
        }

        public async Task<SupplierDto> GetSupplierById(string id)
        {

            var supplier = await _supplierRepository.GetSupplierById(id);
            return _mapper.Map<SupplierDto>(supplier);
        }

        public async Task<SupplierDto> CreateSupplier(string userId, SupplierCreateDto supplierDto)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }

            // Upload image to Cloudinary if provided
            string imageUrl = null;
            if (supplierDto.CertificateProduct != null && supplierDto.CertificateProduct.Length > 0)
            {
                var cloudImage = await _cloudinaryService.UploadImageAsync(supplierDto.CertificateProduct);
                imageUrl = cloudImage.ImagePath;
            }

            // Map DTO to Model
            var supplier = _mapper.Map<Supplier>(supplierDto);
            supplier.UserId = userId;
            supplier.CertificateProductUrl = imageUrl;

            await _supplierRepository.CreateSupplier(userId, supplier);

            // Return the created supplier DTO
            return _mapper.Map<SupplierDto>(supplier);
        }

        public async Task<SupplierDto> UpdateSupplier(string userId, string id, SupplierUpdateDto supplierDto)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }

            // Fetch the existing supplier by ID
            var existingSupplier = await _supplierRepository.GetSupplierById(id);
            if (existingSupplier == null)
            {
                throw new Exception("Supplier not found.");
            }

            // Upload new image to Cloudinary if provided
            if (supplierDto.CertificateProduct != null && supplierDto.CertificateProduct.Length > 0)
            {
                var cloudImage = await _cloudinaryService.UploadImageAsync(supplierDto.CertificateProduct);
                existingSupplier.CertificateProductUrl = cloudImage.ImagePath; // Assuming ImagePath is the property holding the URL
            }

            // Map DTO to Model
            _mapper.Map(supplierDto, existingSupplier);

            // Update the supplier in the repository
            await _supplierRepository.UpdateSupplier(userId, id, existingSupplier);

            // Return the updated supplier DTO
            return _mapper.Map<SupplierDto>(existingSupplier);
        }

        public async Task DeleteSupplier(string userId, string id)
        {
            // Implement your authorization logic here if required...
            if (string.IsNullOrEmpty(userId))
            {
                throw new ArgumentException("User ID cannot be null or empty.");
            }
            await _supplierRepository.DeleteSupplier(userId, id);
        }
    }
}
