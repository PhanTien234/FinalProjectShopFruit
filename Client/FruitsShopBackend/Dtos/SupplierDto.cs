using System.Collections.Generic;

namespace FruitsShopBackend.Dtos
{
    public class SupplierDto
    {
        public string SupplierId { get; set; }
        public string Name { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string CertificateProductUrl { get; set; }
    }
}
