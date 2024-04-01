namespace FruitsShopBackend.Interfaces.IServices
{
    public interface ITokenService
    {
        (string accessToken, string refreshToken) GenerateTokens(string userId);
    }
}
