using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface IUnitFruitRepository
    {
        Task<IEnumerable<UnitFruit>> GetAllUnitFruits();
        Task<UnitFruit> GetUnitFruitById(string id);
        Task<UnitFruit> CreateUnitFruit(UnitFruit unit);
        Task UpdateUnitFruit(string id, UnitFruit unit);
        Task DeleteUnitFruit(string id);
    }
}
