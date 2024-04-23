using FruitsShopBackend.Interfaces.IServices;
using Microsoft.Extensions.Configuration;
using PayPalCheckoutSdk.Orders;
using System.Threading.Tasks;
using System;
using FruitsShopBackend.Dtos;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;
using FruitsShopBackend.Interfaces.IRepositories;
using System.Net.Http.Headers;
using FruitsShopBackend.Model;

namespace FruitsShopBackend.Services
{
    public class PayPalService : IPayPalService
    {
        private readonly IUserRepository _userRepository;
        private readonly HttpClient _httpClient;
        private readonly string _clientId;
        private readonly string _clientSecret;

        public PayPalService(IUserRepository userRepository, HttpClient httpClient, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _httpClient = httpClient;
            _clientId = configuration["PayPalSettings:ClientId"];
            _clientSecret = configuration["PayPalSettings:ClientSecret"];
        }

        public async Task<PayPalOrderResponse> CreateOrder(decimal amount)
        {
            // Construct request body
            var requestBody = new
            {
                intent = "CAPTURE",
                purchase_units = new[]
                {
                    new
                    {
                        amount = new
                        {
                            currency_code = "USD",
                            value = amount.ToString("0.00")
                        }
                    }
                }
            };

            // Serialize request body
            var requestBodyJson = JsonConvert.SerializeObject(requestBody);

            // Construct request
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.paypal.com/v2/checkout/orders");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_clientId}:{_clientSecret}")));
            request.Content = new StringContent(requestBodyJson, Encoding.UTF8, "application/json");

            // Send request
            var response = await _httpClient.SendAsync(request);

            // Handle response
            response.EnsureSuccessStatusCode();
            var responseContent = await response.Content.ReadAsStringAsync();
            var payPalOrderResponse = JsonConvert.DeserializeObject<PayPalOrderResponse>(responseContent);

            return payPalOrderResponse;
        }

        public async Task CaptureOrder(string orderId)
        {
            // Construct request
            var request = new HttpRequestMessage(HttpMethod.Post, $"https://api.paypal.com/v2/checkout/orders/{orderId}/capture");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_clientId}:{_clientSecret}")));

            // Send request
            var response = await _httpClient.SendAsync(request);

            // Handle response
            response.EnsureSuccessStatusCode();
        }

        public async Task SetupSellerPayPalAccount(SellerPayPalAccountDto accountDto)
        {
            // Update user's PayPal account details in the database
            var user = await _userRepository.GetUserById(accountDto.UserId);
            if (user != null)
            {
                user.PayPalFirstName = accountDto.PayPalFirstName;
                user.PayPalLastName = accountDto.PayPalLastName;
                user.PayPalEmail = accountDto.PayPalEmail;
                user.IsPaypalLinked = true;

                await _userRepository.UpdateUser(user);
            }
            else
            {
                // Handle case where user is not found
                throw new Exception($"User with ID '{accountDto.UserId}' not found.");
            }
        }

        public async Task<User> GetSellerPayPalByUserId(string userId)
        {
            // Retrieve user by user ID
            var user = await _userRepository.GetUserById(userId);

            // Check if the user is a seller and has a linked PayPal account
            if (user != null && user.IsSeller && user.IsPaypalLinked)
            {
                // Construct seller PayPal account DTO
                var sellerPayPalAccountDto = new SellerPayPalAccountDto
                {
                    UserId = userId,
                    PayPalFirstName = user.PayPalFirstName,
                    PayPalLastName = user.PayPalLastName,
                    PayPalEmail = user.PayPalEmail
                };

                return user;
            }
            else
            {
                // Handle case where user is not found, not a seller, or does not have a linked PayPal account
                throw new Exception($"Seller PayPal account not found for user with ID '{userId}'.");
            }
        }

        public async Task SendPayment(string recipientEmail, decimal amount)
        {
            // Calculate commission (5%)
            decimal commission = amount * 0.05m;
            decimal amountAfterCommission = amount - commission;

            // Construct request body
            var requestBody = new
            {
                recipient_type = "EMAIL",
                receiver = recipientEmail,
                amount = new
                {
                    value = amountAfterCommission.ToString("0.00"),
                    currency = "USD"
                },
                note = "Payment from FruitsShop",
                sender_item_id = Guid.NewGuid().ToString()
            };

            // Serialize request body
            var requestBodyJson = JsonConvert.SerializeObject(requestBody);

            // Construct request
            var request = new HttpRequestMessage(HttpMethod.Post, "https://api.paypal.com/v2/payments/payouts");
            request.Headers.Authorization = new AuthenticationHeaderValue("Basic", Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_clientId}:{_clientSecret}")));
            request.Content = new StringContent(requestBodyJson, Encoding.UTF8, "application/json");

            // Send request
            var response = await _httpClient.SendAsync(request);

            // Handle response
            response.EnsureSuccessStatusCode();
        }
    }
}
