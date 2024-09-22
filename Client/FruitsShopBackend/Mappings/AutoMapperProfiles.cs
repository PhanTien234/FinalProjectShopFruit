using AutoMapper;
using FruitsShopBackend.Constants;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Model;
using System;
using System.Collections.Generic;
using System.Linq;

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
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<UserCreateDto, User>();
            CreateMap<UserUpdateDto, User>();
            CreateMap<UserCreateDto, UserDto>();
            CreateMap<UserUpdateDto, UserDto>();
            CreateMap<CreateOrderDto, Order>();
            CreateMap<UpdateOrderDto, Order>();
            CreateMap<CreateOrderDto, OrderDto>();
            CreateMap<UpdateOrderDto, OrderDto>();
            CreateMap<Order, OrderDto>()
                .ForMember(dest => dest.TotalOrderValue, opt => opt.MapFrom(src => CalculateTotalOrderValue(src.OrderItems)))
                .ForMember(dest => dest.AmountPaid, opt => opt.MapFrom(src => CalculateAmountPaid(src.OrderItems, src.DiscountAmount)));
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

        private decimal CalculateTotalOrderValue(List<OrderItem> orderItems)
        {
            decimal totalOrderValue = 0;
            foreach (var orderItem in orderItems)
            {
                totalOrderValue += orderItem.Quantity * orderItem.PricePerUnit;
            }
            return totalOrderValue;
        }

        private decimal CalculateAmountPaid(List<OrderItem> orderItems, decimal discountAmount)
        {
            decimal totalOrderValue = CalculateTotalOrderValue(orderItems);
            return totalOrderValue - discountAmount;
        }

    }
}
