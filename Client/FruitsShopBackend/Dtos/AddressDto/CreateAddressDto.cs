using FruitsShopBackend.Constants;

namespace FruitsShopBackend.Dtos
{
    public class CreateAddressDto
    {
        public string FullName { get; set; }
        public string PhoneNumberAddress { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public AddressType AddressType { get; set; }
    }
}
