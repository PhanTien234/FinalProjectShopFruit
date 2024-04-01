namespace FruitsShopBackend.Dtos
{
    public class TokenRefreshRequest
    {
        public string RefreshToken { get; set; }
        public string UserId { get; set; }
    }
}
