using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using System.Collections.Generic;

namespace FruitsShopBackend.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        { 
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CategoryCreateDto, Category>();
            CreateMap<CategoryUpdateDto, Category>();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<ProductCreateUpdateDto, Product>();
            CreateMap<Cart, CartDto>()
                           .ForMember(dest => dest.TotalPrice, opt => opt.MapFrom(src => CalculateTotalPrice(src.Items)));
            CreateMap<CartItem, CartItemDto>();
        }

        private decimal CalculateTotalPrice(List<CartItem> items)
        {
            decimal totalPrice = 0;
            foreach (var item in items)
            {
                totalPrice += item.Price * item.Quantity;
            }
            return totalPrice;
        }
    }
}
