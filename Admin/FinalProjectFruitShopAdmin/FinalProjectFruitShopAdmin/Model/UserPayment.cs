using FinalProjectFruitShopAdmin.Constants;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinalProjectFruitShopAdmin.Model
{
    public class UserPayment
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Auto-generated primary key
        public int PaymentId { get; set; }
        public PaymentType Type { get; set; }
        public string AddtionInfo { get; set; }
        public DateTime CreateOn { get; set; }
        public string UserId { get; set; } // Foreign Key
        public User User { get; set; } // Navigation property

    }
}
