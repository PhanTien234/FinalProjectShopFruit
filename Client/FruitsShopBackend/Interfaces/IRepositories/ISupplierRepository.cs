using FruitsShopBackend.Model;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IRepositories
{
    public interface ISupplierRepository
    {
        Task<IEnumerable<Supplier>> GetAllSuppliersByUser(string userId);
        Task<IEnumerable<Supplier>> GetAllSuppliers();
        Task<Supplier> GetSupplierById(string id);
        Task CreateSupplier(string userId, Supplier supplier);
        Task UpdateSupplier(string userId, string id, Supplier supplier);
        Task DeleteSupplier(string userId, string id);
    }
}
