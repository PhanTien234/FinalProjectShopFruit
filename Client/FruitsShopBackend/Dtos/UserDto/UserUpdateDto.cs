using FruitsShopBackend.Constants;
using Microsoft.AspNetCore.Http;
using System;

namespace FruitsShopBackend.Dtos
{
    public class UserUpdateDto
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public DateTime DoB { get; set; }
        public string PhoneNumber { get; set; }
        public string Password { get; set; }
        public RoleType Role { get; set; }
        public IFormFile Image { get; set; }
    }
}
