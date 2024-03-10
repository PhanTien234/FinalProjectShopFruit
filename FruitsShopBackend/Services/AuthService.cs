using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.IServices;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Engines;
using System.Globalization;

namespace FruitsShopBackend.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserSQLDbContext _context;
        private readonly IEmailVerificationService _emailVerificationService;
        private readonly PasswordHasher<User> _passwordHasher;

        public AuthService(UserSQLDbContext context, IEmailVerificationService emailVerificationService)
        {
            _context = context;
            _emailVerificationService = emailVerificationService;
            _passwordHasher = new PasswordHasher<User>();
        }

        public async Task<Result> RegisterAsync(RegisterRequest request)
        {

            // Check if the user already exists
            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return new Result { Success = false, Message = "Email is already registered." };
            }


            // Hash the password
            var passwordHash = _passwordHasher.HashPassword(null, request.Password);

            //Extract default first name from email
            string[] emailParts = request.Email.Split('@');
            string defaultFirstName = emailParts[0];


            var user = new User
            {
                FirstName = defaultFirstName,
                Email = request.Email,
                PasswordHash = passwordHash,
                DoB = DateTime.MinValue,
                CreatedAt = DateTime.UtcNow,
                LastLoginAt = DateTime.UtcNow,
                NumFollowers = 0,
                IsSeller = false,
                Role = Constants.RoleType.Buyer
                
            };

            // Add user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new Result { Success = true };
        }

        public async Task<Result> LoginAsync(string email, string password)
        {
            // Find user by email
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Email == email);

            // Check if user exists
            if (user == null)
            {
                return new Result { Success = false, Message = "Invalid email or password." };
            }

            // Verify the password
            var result = _passwordHasher.VerifyHashedPassword(null, user.PasswordHash, password);

            if (result == PasswordVerificationResult.Success)
            {
                // Password is correct, return success
                return new Result { Success = true };
            }
            else
            {
                // Password is incorrect, return failure
                return new Result { Success = false, Message = "Invalid email or password." };
            }
        }
        //implement method as needed
    }
}
