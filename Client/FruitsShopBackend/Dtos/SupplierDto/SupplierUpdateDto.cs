using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace FruitsShopBackend.Dtos
{
    public class SupplierUpdateDto
    {
        public string Name { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public IFormFile CertificateProduct { get; set; }
    }
}
