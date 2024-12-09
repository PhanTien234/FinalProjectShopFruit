using Newtonsoft.Json;

namespace FinalProjectFruitShopAdmin.Dtos
{
    public class PayPalTokenResponse
    {
        [JsonProperty("access_token")]
        public string AccessToken { get; set; }

        [JsonProperty("token_type")]
        public string TokenType { get; set; }
    }
}
