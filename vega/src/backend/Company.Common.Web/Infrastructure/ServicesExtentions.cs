namespace Company.Common.Web.Infrastructure
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Dal.Infrastructure.Concrete;
    using Company.Common.Web.Mvc;
    using Company.Common.Web.Validation;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.Extensions.DependencyInjection;

    using Swashbuckle.AspNetCore.Swagger;

    public static class ServicesExtentions
    {
        /// <summary>
        /// Entity Framework data access layer registration
        /// </summary>
        /// <typeparam name="TDbContext"></typeparam>
        /// <param name="services"></param>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        public static IServiceCollection AddEntityFramework<TDbContext>(
            this IServiceCollection services,
            string connectionString) where TDbContext : DbContext
        {
            services
                .AddEntityFrameworkSqlServer()
                .AddDbContext<TDbContext>(options => 
                    options.UseSqlServer(connectionString, opt => opt.UseRowNumberForPaging()));

            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IUnitOfWorkFactory, UnitOfWorkFactory>();

            return services;
        }

        public static IServiceCollection AddMvcWithModelValidation(
            this IServiceCollection services,
            out IMvcBuilder mvcBuilder)
        {
            mvcBuilder = services.AddMvc(
                config =>
                    {
                        config.ModelBinderProviders.Insert(0, new AppModelBinderProvider());
                        config.Filters.Add(typeof(ValidateModelFilter));
                        config.Filters.Add(typeof(ModelErrorsFilter));
                    });

            return services;
        }

        public static IServiceCollection AddCorsEnable(
            this IServiceCollection services)
        {
            services.AddCors(options =>
                {
                    options.AddPolicy(Constants.AllowCors,
                        builder => builder.AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod());
                });

            return services;
        }

        public static IServiceCollection AddSwagger(
            this IServiceCollection services)
        {
            services.AddSwaggerGen(s =>
                    {
                        s.SwaggerDoc("v1", new Info { Title = "API", Version = "v1" });
                    });
            
            return services;
        }
    }
}