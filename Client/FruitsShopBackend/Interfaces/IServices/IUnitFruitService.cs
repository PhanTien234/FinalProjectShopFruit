using FruitsShopBackend.Dtos;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IUnitFruitService
    {
        Task<IEnumerable<UnitFruitDto>> GetAllUnitFruits();
        Task<UnitFruitDto> GetUnitFruitById(string id);
        Task<UnitFruitDto> CreateUnitFruit(UnitFruitCreateUpdateDto unitDto);
        Task UpdateUnitFruit(string id, UnitFruitCreateUpdateDto unitDto);
        Task DeleteUnitFruit(string id);
    }
}
