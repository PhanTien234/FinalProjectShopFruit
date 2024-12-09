using FinalProjectFruitShopAdmin.Data;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserSQLDbContext _context;

        public UserRepository(UserSQLDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserById(string userId)
        {
            return await _context.Users.FindAsync(userId);
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task CreateUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUser(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteUser(User user)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetUsersByIds(List<string> userIds)
        {
            return await _context.Users
                                 .Where(user => userIds.Contains(user.UserId))
                                 .ToListAsync();
        }

    }
}
