using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IUserAddressService
    {
        Task<List<AddressDto>> GetAllAddressesAsync();
        Task<List<AddressDto>> GetAllAddressesAsyncByUserId(string userId);
        Task<AddressDto> GetAddressByIdAsync(string userId, string addressId);
        Task<AddressDto> CreateAddressAsync(string userId, CreateAddressDto addressDto);
        Task<AddressDto> UpdateAddressAsync(string userId, string addressId, UpdateAddressDto addressDto);
        Task<bool> DeleteAddressAsync(string userId, string addressId);
    }
}
