using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;
using System;
using Microsoft.EntityFrameworkCore;
using Org.BouncyCastle.Crypto.Engines;
using System.Globalization;
using FruitsShopBackend.Interfaces.IServices;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Cryptography;
using Amazon.Runtime.Internal.Util;

namespace FruitsShopBackend.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserSQLDbContext _context;
        private readonly PasswordHasher<User> _passwordHasher;
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;


        public AuthService(UserSQLDbContext context, IConfiguration configuration, IMemoryCache cache)
        {
            _context = context;
            _passwordHasher = new PasswordHasher<User>();
            _configuration = configuration;
            _cache = cache;
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


            var userDto = new UserDto
            {
                UserId = user.UserId,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                CreatedAt = user.CreatedAt
            };

            return new Result { Success = true, Data = new {  User = userDto }, Message = "Sign up successfully!" };
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
                // Update last login timestamp
                user.LastLoginAt = DateTime.UtcNow;
                await _context.SaveChangesAsync();


                // Generate JWT token
                DateTime accessTokenExpiresAt;
                var accessToken = GenerateAccessToken(user, out accessTokenExpiresAt);

                DateTime refreshTokenExpiresAt;
                var refreshToken = GenerateRefreshToken(user, out refreshTokenExpiresAt);
                // Save refresh token to cache or database with expiration time
                _cache.Set("RefreshToken_" + user.UserId, refreshToken, refreshTokenExpiresAt); // Refresh token expires in 3 minutes

               
                var userDto = new UserDto
                {
                    UserId = user.UserId,
                    Email = user.Email,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    CreatedAt = user.CreatedAt
                };

                return new Result { Success = true, Data = new {
                    AccessToken = accessToken,
                    AccessTokenExpiresAt = accessTokenExpiresAt,
                    RefreshToken = refreshToken,
                    RefreshTokenExpiresAt = refreshTokenExpiresAt,
                    User = userDto
                }, Message = "Login successful!" };
            }
            else
            {
                // Password is incorrect, return failure
                return new Result { Success = false, Message = "Invalid email or password." };
            }

        }

        public async Task<Result> RefreshTokenAsync(string refreshToken, string userId)
        {
            // Validate the refresh token
            var storedToken = _cache.Get<string>("RefreshToken_" + userId);

            if (storedToken == null || storedToken != refreshToken)
            {
                return new Result { Success = false, Message = "Invalid refresh token." };
            }

            // Ensure the user exists
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                return new Result { Success = false, Message = "Invalid user." };
            }

            // Generate a new access token for the user
            DateTime accessTokenExpiresAt;
            var accessToken = GenerateAccessToken(user, out accessTokenExpiresAt );
            accessTokenExpiresAt = accessTokenExpiresAt.AddDays(15);

            // Return the new access token and refresh token
            return new Result
            {
                Success = true,
                Data = new
                {
                    AccessToken = accessToken,
                    AccessTokenExpiresAt = accessTokenExpiresAt,
                }
            };
        }
        public async Task<Result> LogoutAsync(string userId)
        {
            // You might need to validate the userId or handle potential exceptions
            _cache.Remove("RefreshToken_" + userId);
            return new Result { Success = true, Message = "Logged out successfully." };
        }
        private string GenerateAccessToken(User user, out DateTime expiresAt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_configuration["Jwt:Secret"]); // Read secret from configuration
            expiresAt = DateTime.UtcNow.AddMinutes(15);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
                    // Add more claims as needed (e.g., roles)
                }),
                Expires = expiresAt,
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private string GenerateRefreshToken(User user, out DateTime expiresAt)
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            var refreshToken = Convert.ToBase64String(randomNumber);
            expiresAt = DateTime.UtcNow.AddDays(14); // Refresh token expires in 14 days
            return refreshToken;
        }

    }
}
