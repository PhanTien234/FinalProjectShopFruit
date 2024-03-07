using FruitsShopBackend.IRepositories;
using FruitsShopBackend.IServices;
using FruitsShopBackend.Repositories;
using FruitsShopBackend.Services;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace FruitsShopBackend.Extensions.Collections
{
    public static class ServiceCollectionExtensions
    {
        public static void AddCustomServices(this IServiceCollection services)
        {
            // Register repositories and services with transient lifetime



        }
    }
}
