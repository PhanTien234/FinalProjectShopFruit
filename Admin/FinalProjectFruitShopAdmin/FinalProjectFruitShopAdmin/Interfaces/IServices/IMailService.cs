using FinalProjectFruitShopAdmin.Dtos;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin.Interfaces.IServices
{
    public interface IMailService
    {
        Task<Result> SendEmailAsync(string email, string subject, string body);
    }
}
