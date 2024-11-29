using FruitsShopBackend.Model;
using System;
using System.Collections.Generic;

namespace FruitsShopBackend.Dtos
{
    public class CategoryDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public CloudImage CloudImage { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
