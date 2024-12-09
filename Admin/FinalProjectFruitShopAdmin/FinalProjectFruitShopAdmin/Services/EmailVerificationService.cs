using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Services
{
    public class EmailVerificationService : IEmailVerificationService
    {
        private readonly IMailService _mailService;
        private readonly IMemoryCache _cache;

        public EmailVerificationService(IMailService mailService, IMemoryCache cache)
        {
            _mailService = mailService;
            _cache = cache;
        }

        public async Task<Result> SendVerificationCodeAsync(string email)
        {
            // Generate verification code
            string verificationCode = GenerateVerificationCode();

            // Save the verification code to cache
            _cache.Set(email, verificationCode, TimeSpan.FromMinutes(10)); //Cache for 10 minutes

            // Send verification code via email
            var emailResult = await _mailService.SendEmailAsync(email, "Verification Code", $"Your verification code is: {verificationCode}");

            if (emailResult.Success)
            {
                // Code sent successfully
                return new Result { Success = true };
            }
            else
            {
                // Failed to send email
                return new Result { Success = false, Message = emailResult.Error };
            }
        }

        public Task<Result> VerifyVerificationCodeAsync(string email, string verificationCode)
        {
            // Retrieve the saved verification code from cache
            if (_cache.TryGetValue(email, out string savedVerificationCode))
            {
                // Compare the provided verification code with the saved verification code
                if (savedVerificationCode == verificationCode)
                {
                    // Verification code matches
                    return Task.FromResult(new Result { Success = true, Message = "Verification code is valid." });
                }
            }

            // Verification code does not match or is not found in cache
            return Task.FromResult(new Result { Success = false, Message = "Invalid verification code." });
        }

        private string GenerateVerificationCode()
        {
            const string chars = "0123456789";
            var random = new Random();
            var verificationCode = new char[6]; // 6-character verification code

            for (int i = 0; i < verificationCode.Length; i++)
            {
                verificationCode[i] = chars[random.Next(chars.Length)];
            }

            return new string(verificationCode);
        }
    }
}
