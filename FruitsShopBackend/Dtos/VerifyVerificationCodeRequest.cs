namespace FruitsShopBackend.Dtos
{
    public class VerifyVerificationCodeRequest
    {
        public string Email { get; set; }   
        public string VerificationCode { get; set; }
    }
}
