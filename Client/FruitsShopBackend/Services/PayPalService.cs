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

namespace FruitsShopBackend.Services
{
    public class PayPalService : IPayPalService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl;
        private readonly IUserRepository _userRepository;

        public PayPalService(IConfiguration configuration, HttpClient httpClient, IUserRepository userRepository)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _baseUrl = _configuration["PayPalSettings:BaseUrl"];
            _userRepository = userRepository;
        }

        public async Task<string> CreateOrder(Order order)
        {
            try
            {
                // Construct request body for creating order
                var requestContent = new StringContent(BuildOrderRequestBody(order), Encoding.UTF8, "application/json");

                // Call PayPal API to create order
                var response = await _httpClient.PostAsync($"{_baseUrl}/orders/create", requestContent);
                response.EnsureSuccessStatusCode(); // Throw if HTTP error

                // Parse response to get order ID
                var orderId = await response.Content.ReadAsStringAsync();
                return orderId;
            }
            catch (Exception ex)
            {
                // Log or handle error
                throw new Exception("Error creating PayPal order", ex);
            }
        }

        public async Task<bool> CapturePayment(string orderId)
        {
            try
            {
                // Construct request body for capturing payment
                var requestContent = new StringContent(BuildCapturePaymentRequestBody(orderId), Encoding.UTF8, "application/json");

                // Call PayPal API to capture payment
                var response = await _httpClient.PostAsync($"{_baseUrl}/payments/capture", requestContent);
                response.EnsureSuccessStatusCode(); // Throw if HTTP error
                return true; // Payment captured successfully
            }
            catch (Exception ex)
            {
                // Log or handle error
                throw new Exception("Error capturing PayPal payment", ex);
            }
        }

        public async Task<bool> SetupSellerPayPalAccount(SetAccountSellerPayPalRequestDto accountRequest)
        {
            try
            {
                // Construct request body for setting up seller's PayPal account
                var requestBody = new
                {
                    PayPalFirstName = accountRequest.PayPalFirstName,
                    PayPalLastName = accountRequest.PayPalLastName,
                    PayPalEmail = accountRequest.PayPalEmail
                };

                // Serialize the request body to JSON
                var jsonRequestBody = JsonConvert.SerializeObject(requestBody);

                // Construct HTTP request
                var requestContent = new StringContent(jsonRequestBody, Encoding.UTF8, "application/json");

                // Call PayPal API to set up seller's PayPal account
                var response = await _httpClient.PostAsync($"{_baseUrl}/seller/paypal/account/setup", requestContent);
                response.EnsureSuccessStatusCode(); // Throw if HTTP error

                return true; // Return true if setup is successful
            }
            catch (Exception ex)
            {
                // Log or handle error
                throw new Exception("Error setting up seller's PayPal account", ex);
            }
        }

        public async Task<bool> SendPaymentToSeller(string sellerPayPalEmail, decimal amount)
        {
            try
            {
                // Construct request body for sending payment
                var requestContent = new StringContent(BuildSendPaymentRequestBody(sellerPayPalEmail, amount), Encoding.UTF8, "application/json");

                // Call PayPal API to send payment
                var response = await _httpClient.PostAsync($"{_baseUrl}/payments/send", requestContent);
                response.EnsureSuccessStatusCode(); // Throw if HTTP error
                return true; // Payment sent successfully
            }
            catch (Exception ex)
            {
                // Log or handle error
                throw new Exception("Error sending payment to seller", ex);
            }
        }

        private string BuildOrderRequestBody(Order order)
        {
            // Implement logic to build request body
            return JsonConvert.SerializeObject(order);
        }

        private string BuildCapturePaymentRequestBody(string orderId)
        {
            // Implement logic to build request body
            var requestBody = new
            {
                orderId
            };
            return JsonConvert.SerializeObject(requestBody);
        }

        private string BuildSendPaymentRequestBody(string receiverEmail, decimal amount)
        {
            // Implement logic to build request body
            var requestBody = new
            {
                receiverEmail,
                amount
            };
            return JsonConvert.SerializeObject(requestBody);
        }
    }
}
