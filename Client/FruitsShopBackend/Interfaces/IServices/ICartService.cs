using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface ICartService
    {
        Task<CartDto> GetUserCart(string userId);
        Task AddToCart(string userId, string productId);
        Task UpdateCart(CartDto cartDto);
        Task RemoveFromCart(string userId, string productId);
    }
}
