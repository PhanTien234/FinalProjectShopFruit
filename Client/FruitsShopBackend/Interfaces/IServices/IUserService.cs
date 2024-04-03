using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IUserService
    {
        Task<UserDto> GetUserById(string userId);
        Task<List<UserDto>> GetAllUsers();
        Task<UserDto> CreateUser(UserCreateDto userDto);
        Task<UserDto> UpdateUser(string userId, UserUpdateDto userDto);
        Task DeleteUser(string userId);
    }
}
