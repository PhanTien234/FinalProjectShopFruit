using FruitsShopBackend.Data;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Model;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace FruitsShopBackend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserSQLDbContext _context;

        public UserRepository(UserSQLDbContext context)
        {
            _context = context;
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task CreateUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateUserAsync(User user)
        {
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
        }
    }
}
