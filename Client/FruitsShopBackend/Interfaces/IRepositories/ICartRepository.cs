using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface ICartRepository
    {
        Task<Cart> GetCartByUserId(string userId);
        Task UpdateCart(Cart cart);
    }
}
