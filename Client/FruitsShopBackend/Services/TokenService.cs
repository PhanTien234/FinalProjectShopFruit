using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;
using Microsoft.Extensions.Caching.Memory;
using System.Security.Cryptography;
using FruitsShopBackend.Interfaces.IServices;

namespace FruitsShopBackend.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly IMemoryCache _cache;

        public TokenService(IConfiguration configuration, IMemoryCache cache)
        {
            _configuration = configuration;
            _cache = cache;
        }

        public (string accessToken, string refreshToken) GenerateTokens(string userId)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var signingCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var accessTokenExpiration = TimeSpan.FromHours(3); // Access token expiration time
            var refreshTokenExpiration = TimeSpan.FromDays(7); // Refresh token expiration time

            var accessToken = GenerateAccessToken(userId, signingCredentials, accessTokenExpiration);
            var refreshToken = GenerateRefreshToken();

            // Store refresh token in cache with expiration time
            _cache.Set(refreshToken, userId, refreshTokenExpiration);

            return (accessToken, refreshToken);
        }

        private string GenerateAccessToken(string userId, SigningCredentials signingCredentials, TimeSpan expiration)
        {
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, userId),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenOptions = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.Add(expiration),
                signingCredentials: signingCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }

        private string GenerateRefreshToken()
        {
            // Generate a random refresh token
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}
