using FinalProjectFruitShopAdmin.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IServices
{
    public interface IEmailVerificationService
    {
        Task<Result> SendVerificationCodeAsync(string email);
        Task<Result> VerifyVerificationCodeAsync(string email, string verificationCode);
    }

}
