using FinalProjectFruitShopAdmin.Dtos;
using System.Threading.Tasks;
using System;
using MimeKit;
using MailKit.Security;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using FinalProjectFruitShopAdmin.Interfaces.IServices;

namespace FinalProjectFruitShopAdmin.Services
{
    public class MailService : IMailService
    {
        private readonly MailSettings _mailSettings;

        public MailService(IOptions<MailSettings> mailSettings) 
        { 
            _mailSettings = mailSettings.Value;
        }
        public async Task<Result> SendEmailAsync(string email, string subject, string body)
        {
            try
            {
                var message = new MimeMessage();
                message.From.Add(new MailboxAddress("Tien", "minhtienp328@gmail.com")); // Change to your email and name
                message.To.Add(new MailboxAddress("", email));
                message.Subject = subject;
                message.Body = new TextPart("plain")
                {
                    Text = body
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync(_mailSettings.MailServer, _mailSettings.MailPort, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync(_mailSettings.SenderEmail, _mailSettings.Password);
                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                return new Result { Success = true };
            }
            catch (Exception ex)
            {
                return new Result { Success = false, Error = ex.Message };
            }
        }
    }
}
