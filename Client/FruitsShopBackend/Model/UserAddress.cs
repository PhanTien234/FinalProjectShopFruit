using FruitsShopBackend.Constants;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace FruitsShopBackend.Model
{
    public class UserAddress
    {
       [Key]
       public string AddressId { get; set; }
       public string FullName { get; set; }
       public string PhoneNumberAddress { get; set; }
       public string Address { get; set; }
       public string City { get; set; }
       public AddressType AddressType { get; set; }
       public string UserId { get; set; } // Foreign key
       public User User { get; set; } // Navigation  property
    }
}
