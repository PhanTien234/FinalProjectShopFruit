using FruitsShopBackend.Data;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FruitsShopBackend.Repositories
{
    public class UserAddressRepository : IUserAddressRepository
    {
        private readonly UserSQLDbContext _context;

        public UserAddressRepository(UserSQLDbContext context)
        {
            _context = context;
        }

        public async Task<UserAddress> GetByIdAsync(string userId, string addressId)
        {
            return await _context.UserAddresses.FirstOrDefaultAsync(a => a.UserId == userId && a.AddressId == addressId);
        }

        public async Task<IEnumerable<UserAddress>> GetAllAsync(string userId)
        {
            return await _context.UserAddresses.Where(a => a.UserId == userId).ToListAsync();
        }

        public async Task<UserAddress> CreateAsync(UserAddress address)
        {
            _context.UserAddresses.Add(address);
            await _context.SaveChangesAsync();
            return address;
        }

        public async Task<UserAddress> UpdateAsync(UserAddress address)
        {
            _context.UserAddresses.Update(address);
            await _context.SaveChangesAsync();
            return address;
        }

        public async Task<bool> DeleteAsync(string addressId)
        {
            var address = await _context.UserAddresses.FindAsync(addressId);
            if (address == null)
                return false;

            _context.UserAddresses.Remove(address);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
