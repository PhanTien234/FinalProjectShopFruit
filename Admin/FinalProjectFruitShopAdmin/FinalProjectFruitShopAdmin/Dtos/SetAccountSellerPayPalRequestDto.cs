namespace FinalProjectFruitShopAdmin.Dtos
{
    public class SetAccountSellerPayPalRequestDto
    {
        public string PayPalFirstName { get; set; }
        public string PayPalLastName { get; set; }
        public string PayPalEmail { get; set; }
        public bool IsPaypalLinked { get; set; }
    }
}
