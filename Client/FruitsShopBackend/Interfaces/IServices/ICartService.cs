using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface ICartService
    {
        Task<CartDto> GetUserCart(string userId);
        Task AddToCart(string userId, string productId, int quantity);
        Task UpdateCart(string userId, UpdateCartDto updateCartItemDto);
        Task RemoveFromCart(string userId, string productId);
    }
}
