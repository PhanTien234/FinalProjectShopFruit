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

            // Register AutoMapper and specify the profile class
            services.AddTransient<IMapper>(_ => new Mapper(new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new AutoMapperProfiles());
            })));

            // Configure MailSettings from appsettings.json
            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ICategoryRepository, CategoryRepository>();
            // Register Services
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IEmailVerificationService, EmailVerificationService>();
            services.AddScoped<IMailService, MailService>();
            services.AddScoped<ICategoryService, CategoryService>();

            // Add other custom services here

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

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
