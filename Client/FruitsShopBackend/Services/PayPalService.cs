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
using Microsoft.Extensions.Options;

namespace FruitsShopBackend.Services
{
    public class PayPalService : IPayPalService
    {
        private readonly IUserRepository _userRepository;
        private readonly HttpClient _httpClient;
        private readonly PayPalSettings _settings;

        public PayPalService(IUserRepository userRepository, HttpClient httpClient, IOptions<PayPalSettings> options)
        {
            _userRepository = userRepository;
            _httpClient = httpClient;
            _settings = options.Value;
        }


        private async Task<string> GetAccessTokenAsync()
        {
            var authToken = Convert.ToBase64String(Encoding.ASCII.GetBytes($"{_settings.ClientId}:{_settings.Secret}"));
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic", authToken);

            var requestContent = new StringContent("grant_type=client_credentials", Encoding.UTF8, "application/x-www-form-urlencoded");
            var response = await _httpClient.PostAsync($"{_settings.Url}/v1/oauth2/token", requestContent);

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var tokenResponse = JsonConvert.DeserializeObject<PayPalTokenResponse>(responseContent);

            return tokenResponse.AccessToken;
        }

        public async Task<PayPalOrderResponse> CreateOrder(decimal amount)
        {
            var accessToken = await GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

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

            var requestBodyJson = JsonConvert.SerializeObject(requestBody);
            var response = await _httpClient.PostAsync($"{_settings.Url}/v2/checkout/orders", new StringContent(requestBodyJson, Encoding.UTF8, "application/json"));

            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            return JsonConvert.DeserializeObject<PayPalOrderResponse>(responseContent);
        }

        public async Task SendPayment(string recipientEmail, decimal amount)
        {
            var accessToken = await GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            // Calculate commission (5%)
            decimal commission = amount * 0.05m;
            decimal amountAfterCommission = amount - commission;

            var requestBody = new
            {
                sender_batch_header = new
                {
                    email_subject = "You have a payment from FruitsShop",
                    email_message = "Thank you for using FruitsShop."
                },
                items = new[]
                {
                    new
                    {
                        recipient_type = "EMAIL",
                        receiver = recipientEmail,
                        amount = new
                        {
                            value = amountAfterCommission.ToString("F2"),
                            currency = "USD"
                        },
                        note = "Payment from FruitsShop",
                        sender_item_id = Guid.NewGuid().ToString()
                    }
                }
            };

            var requestBodyJson = JsonConvert.SerializeObject(requestBody);
            var response = await _httpClient.PostAsync($"{_settings.Url}/v1/payments/payouts", new StringContent(requestBodyJson, Encoding.UTF8, "application/json"));

            if (!response.IsSuccessStatusCode)
            {
                var errorContent = await response.Content.ReadAsStringAsync();
                throw new Exception($"PayPal API error: {errorContent}");
            }
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
            var user = await _userRepository.GetUserById(userId);

            if (user == null || !user.IsSeller || !user.IsPaypalLinked)
            {
                throw new Exception($"Seller PayPal account not found for user with ID '{userId}'.");
            }

            return user;
        }
    }
}
