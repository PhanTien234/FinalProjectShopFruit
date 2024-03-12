using FruitsShopBackend.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FruitsShopBackend.Interfaces.IServices
{
    public interface IEmailVerificationService
    {
        Task<Result> SendVerificationCodeAsync(string email);
        Task<Result> VerifyVerificationCodeAsync(string email, string verificationCode);
    }

}
