using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Web;

namespace FruitsShopBackend.Model
{
    public class UserAddress
    {
       [Key]
       public string AddressId { get; set; }
       public string Address { get; set; }
       public string City { get; set; }
       public string State { get; set; }
       public string UserId { get; set; } // Foreign key
       public User User { get; set; } // Navigation  property
    }
}
