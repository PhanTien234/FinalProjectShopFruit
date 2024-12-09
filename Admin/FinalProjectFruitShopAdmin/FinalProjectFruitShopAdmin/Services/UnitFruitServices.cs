using AutoMapper;
using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Model;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;
using FinalProjectFruitShopAdmin.Interfaces.IServices;

namespace FinalProjectFruitShopAdmin.Services
{
    public class UnitFruitServices : IUnitFruitService
    {
        private readonly IUnitFruitRepository _unitFruitRepository;
        private readonly IMapper _mapper;

        public UnitFruitServices(IUnitFruitRepository unitFruitRepository, IMapper mapper)
        {
            _unitFruitRepository = unitFruitRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UnitFruitDto>> GetAllUnitFruits()
        {
            var unitFruits = await _unitFruitRepository.GetAllUnitFruits();
            return _mapper.Map<IEnumerable<UnitFruitDto>>(unitFruits);
        }

        public async Task<UnitFruitDto> GetUnitFruitById(string id)
        {
            var unit = await _unitFruitRepository.GetUnitFruitById(id);
            return _mapper.Map<UnitFruitDto>(unit);
        }

        public async Task<UnitFruitDto> CreateUnitFruit(UnitFruitCreateUpdateDto unitFruitDto)
        {
            var unit = _mapper.Map<UnitFruit>(unitFruitDto);
            unit.CreatedAt = DateTime.UtcNow;

            var createdUnitFruit = await _unitFruitRepository.CreateUnitFruit(unit);
            return _mapper.Map<UnitFruitDto>(createdUnitFruit);
        }

        public async Task UpdateUnitFruit(string id, UnitFruitCreateUpdateDto unitFruitDto)
        {
            var unit = _mapper.Map<UnitFruit>(unitFruitDto);
            await _unitFruitRepository.UpdateUnitFruit(id, unit);
        }

        public async Task DeleteUnitFruit(string id)
        {
            await _unitFruitRepository.DeleteUnitFruit(id);
        }
    }
}
