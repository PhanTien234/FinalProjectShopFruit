using Newtonsoft.Json;

namespace FruitsShopBackend.Dtos
{
    public class PayPalOrderResponse
    {
        [JsonProperty("id")]
        public string id { get; set; }

        [JsonProperty("status")]
        public string Status { get; set; }
    }
}
