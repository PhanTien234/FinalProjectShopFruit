using AutoMapper;
using CloudinaryDotNet;
using FinalProjectFruitShopAdmin.Data;
using FinalProjectFruitShopAdmin.Dtos;
using FinalProjectFruitShopAdmin.Interfaces.IRepositories;
using FinalProjectFruitShopAdmin.Interfaces.IServices;
using FinalProjectFruitShopAdmin.Mappings;
using FinalProjectFruitShopAdmin.Repositories;
using FinalProjectFruitShopAdmin.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FinalProjectFruitShopAdmin
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            services.AddMemoryCache();

            // Configure DbContext

            services.AddDbContext<UserSQLDbContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("UserConnection")));

            // Add MongoDB context
            services.AddSingleton<MongoDbContext>();

            // Configure Cloudinary
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.AddSingleton(x =>
            {
                var cloudinarySettings = x.GetRequiredService<IOptions<CloudinarySettings>>().Value;
                return new Cloudinary(new Account(
                    cloudinarySettings.CloudName,
                    cloudinarySettings.ApiKey,
                    cloudinarySettings.ApiSecret));
            });
            // Configure PayPalSettings from appsettings.json
            services.Configure<PayPalSettings>(Configuration.GetSection("PayPalSettings"));

            // Register AutoMapper and specify the profile class
            services.AddTransient<IMapper>(_ => new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfiles());
            })));

            // Configure MailSettings from appsettings.json
            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            services.AddScoped<IProductRepository, ProductRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IOrderRepository, OrderRepository>();
            services.AddScoped<IPaymentMethodRepository, PaymentMethodRepository>();
            services.AddScoped<ISupplierRepository, SupplierRepository>();
            services.AddScoped<IUnitFruitRepository, UnitFruitRepository>();
            // Register Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailVerificationService, EmailVerificationService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICloudinaryService, CloudinaryService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IPaymentMethodService, PaymentMethodService>();
            services.AddScoped<IUnitFruitService, UnitFruitServices>();
            services.AddScoped<ISupplierService, SupplierService>();
            services.AddHttpClient<IPayPalService, PayPalService>();

            // Add other custom services here

            // Read JWT Secret from appsettings.json
            var jwtSecret = Configuration.GetSection("Jwt:Secret").Value;
            var key = Encoding.ASCII.GetBytes(jwtSecret);

            // Configure JWT Authentication
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.RequireHttpsMetadata = false;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });

            services.AddCors(options =>
            {
                options.AddPolicy("AllowReactDevClient",
                    builder =>
                    {
                        builder.WithOrigins("http://localhost:3008")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });



            // Use the custom service registration extension method
            // services.AddCustomServices();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FruitsShopBackendAdmin", Version = "v1" });

                // Add JWT bearer authentication
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description = "JWT Authorization header using the Bearer scheme.",
                    Type = SecuritySchemeType.Http,
                    Scheme = "bearer"
                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] { }
                    }
                });
            });

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "FruitsShopBackend v1"));
            }

            app.UseCors("AllowReactDevClient");
            app.UseHttpsRedirection();

            app.UseRouting();

            //Enable authentication
            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
