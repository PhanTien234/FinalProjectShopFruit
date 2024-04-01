using FruitsShopBackend.Data;
using FruitsShopBackend.Dtos;
using FruitsShopBackend.Interfaces.IRepositories;
using FruitsShopBackend.Interfaces.IServices;
using FruitsShopBackend.Repositories;
using FruitsShopBackend.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using AutoMapper;
using FruitsShopBackend.Mappings;
using CloudinaryDotNet;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System;

namespace FruitsShopBackend
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
            services.AddScoped<ICartRepository, CartRepository>();
            // Register Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailVerificationService, EmailVerificationService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<ICategoryService, CategoryService>();
            services.AddScoped<IProductService, ProductService>();
            services.AddScoped<ICartService, CartService>();
            services.AddScoped<ICloudinaryService, CloudinaryService>();
            services.AddScoped<ITokenService, TokenService>();

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
                        builder.WithOrigins("http://localhost:3000")
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

           

            // Use the custom service registration extension method
            // services.AddCustomServices();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "FruitsShopBackend", Version = "v1" });

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
