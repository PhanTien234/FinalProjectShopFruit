using System.ComponentModel.DataAnnotations;

namespace FinalProjectFruitShopAdmin.Dtos
{
    public class SendPaymentDto
    {
        [Required]
        [EmailAddress]
        public string RecipientEmail { get; set; }

        [Required]
        [Range(0.01, double.MaxValue)]
        public decimal Amount { get; set; }
    }
}
