using AutoMapper;
using FinalProjectFruitShopAdmin.Constants;
using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FinalProjectFruitShopAdmin.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles() 
        { 
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<CategoryCreateUpdateDto, Category>();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<ProductCreateUpdateDto, Product>();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserCreateDto, UserDto>();
            CreateMap<UserUpdateDto, UserDto>();
            CreateMap<CreateOrderDto, Order>();
            CreateMap<UpdateOrderDto, Order>();
            CreateMap<CreateOrderDto, OrderDto>();
            CreateMap<UpdateOrderDto, OrderDto>();
            CreateMap<Order, OrderDto>();
            CreateMap<OrderItem, OrderItemDto>();
            CreateMap<CreateOrderItemDto, OrderItemDto>();
            CreateMap<CreateOrderItemDto, OrderItem>();
            CreateMap<UserAddress, AddressDto>().ReverseMap();
            CreateMap<CreateAddressDto, UserAddress>();
            CreateMap<UpdateAddressDto, UserAddress>();
            CreateMap<Supplier, SupplierDto>().ReverseMap();
            CreateMap<SupplierCreateDto, Supplier>();
            CreateMap<SupplierUpdateDto, Supplier>();
            CreateMap<UnitFruit, UnitFruitDto>().ReverseMap();
            CreateMap<UnitFruitCreateUpdateDto, UnitFruit>();
            CreateMap<PaymentMethod, PaymentMethodDto>().ReverseMap();
            CreateMap<PaymentMethodCreateUpdateDto, PaymentMethod>();

        }

    }
}
