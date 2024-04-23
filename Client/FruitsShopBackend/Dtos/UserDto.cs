using FruitsShopBackend.Constants;
using System;

namespace FruitsShopBackend.Dtos
{
    public class UserDto
    {
        public string UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DoB { get; set; }
        public string Gender { get; set; }
        public string PhoneNumber { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime? LastLoginAt { get; set; }
        public int NumFollowers { get; set; }
        public string ImageId { get; set; }
        public string ImageUserPath { get; set; }
        public bool IsSeller { get; set; }
        public RoleType Role { get; set; }

        // PayPal related fields
        public string PayPalFirstName { get; set; }
        public string PayPalLastName { get; set; }
        public string PayPalEmail { get; set; }
        public bool IsPaypalLinked { get; set; }
    }
}
