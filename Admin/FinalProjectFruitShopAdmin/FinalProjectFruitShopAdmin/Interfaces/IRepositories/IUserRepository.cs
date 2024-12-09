using FinalProjectFruitShopAdmin.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IRepositories
{
    public interface IUserRepository
    {
        Task<User> GetUserById(string userId);
        Task<List<User>> GetAllUsers();
        Task CreateUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(User user);
        Task<List<User>> GetUsersByIds(List<string> userIds);
    }
}
