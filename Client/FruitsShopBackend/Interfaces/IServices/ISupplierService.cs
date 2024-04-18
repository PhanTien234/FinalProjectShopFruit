using FruitsShopBackend.Dtos;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface ISupplierService
    {
        Task<IEnumerable<SupplierDto>> GetAllSuppliersByUser(string userId);
        Task<IEnumerable<SupplierDto>> GetAllSuppliers();
        Task<SupplierDto> GetSupplierById(string id);
        Task<SupplierDto> CreateSupplier(string userId, SupplierCreateDto supplierDto);
        Task<SupplierDto> UpdateSupplier(string userId, string id, SupplierUpdateDto supplierDto);
        Task DeleteSupplier(string userId, string id);

    }
}
