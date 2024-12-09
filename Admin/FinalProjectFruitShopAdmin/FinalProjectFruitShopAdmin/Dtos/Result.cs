namespace FinalProjectFruitShopAdmin.Dtos
{
    public class Result
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public string Error { get; set; }
        public object Data { get; set; }
    }
}
