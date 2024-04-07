using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Services
{
    public class UserAddressService : IUserAddressService
    {
        private readonly IUserAddressRepository _repository;
        private readonly IMapper _mapper;

        public UserAddressService(IUserAddressRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<AddressDto> GetAddressByIdAsync(string userId, string addressId)
        {
            // Ensure the address belongs to the user before retrieving
            var address = await _repository.GetByIdAsync(userId, addressId);
            if (address == null)
                return null;

            return _mapper.Map<AddressDto>(address);
        }

        public async Task<IEnumerable<AddressDto>> GetAllAddressesAsync(string userId)
        {
            var addresses = await _repository.GetAllAsync(userId);
            return _mapper.Map<IEnumerable<AddressDto>>(addresses);
        }

        public async Task<AddressDto> CreateAddressAsync(string userId, CreateAddressDto addressDto)
        {
            var address = new UserAddress
            {
                UserId = userId,
                Address = addressDto.Address,
                City = addressDto.City,
                State = addressDto.State
            };
            await _repository.CreateAsync(address);
            return _mapper.Map<AddressDto>(address);
        }

        public async Task<AddressDto> UpdateAddressAsync(string userId, string addressId, UpdateAddressDto addressDto)
        {
            // Ensure the address belongs to the user before updating
            var existingAddress = await _repository.GetByIdAsync(userId, addressId);
            if (existingAddress == null)
                return null;

            // Update the address properties
            _mapper.Map(addressDto, existingAddress);
            await _repository.UpdateAsync(existingAddress);
            return _mapper.Map<AddressDto>(existingAddress);
        }

        public async Task<bool> DeleteAddressAsync(string userId, string addressId)
        {
            // Ensure the address belongs to the user before deleting
            var address = await _repository.GetByIdAsync(userId, addressId);
            if (address == null)
                return false;

            return await _repository.DeleteAsync(addressId);
        }
    }

}
