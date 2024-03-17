using AutoMapper;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;

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
        }
    }
}
