using FruitsShopBackend.Constants;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FruitsShopBackend.Model
{
    public class User
    {
        [Key]
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DoB { get; set; }
        public string PhoneNumber { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public int NumFollowers { get; set; }
        public bool IsSeller { get; set; }
        public RoleType Role { get; set; }

        public List<UserAddress> Addresses { get; set; }
        public List<UserPayment> Payments { get; set; }
    }
}
