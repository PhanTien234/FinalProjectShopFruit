using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface IUserAddressRepository
    {
        Task<UserAddress> GetByIdAsync(string userId, string addressId);
        Task<List<UserAddress>> GetAllAsync();
        Task<List<UserAddress>> GetAllAsyncByUserId(string userId);
        Task<UserAddress> CreateAsync(UserAddress address);
        Task<UserAddress> UpdateAsync(UserAddress address);
        Task<bool> DeleteAsync(string addressId);
    }
}
