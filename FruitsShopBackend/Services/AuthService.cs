using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.IServices;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Engines;

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

            // Verify the verification code
            var verifyResult = await _emailVerificationService.VerifyVerificationCodeAsync(request.Email, request.VerificationCode);

            if (!verifyResult.Success)
            {
                return new Result { Success = false, Message = "Failed to verify email. Please enter the correct verification code." };
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
                CreatedAt = DateTime.UtcNow,
                LastLoginAt = DateTime.UtcNow,
                NumFollowers = 0
            };

            // Add user to the database
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return new Result { Success = true };
        }

        // Implement other methods as needed
    }
}
