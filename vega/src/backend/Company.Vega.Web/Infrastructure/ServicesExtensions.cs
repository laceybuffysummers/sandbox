namespace Company.Vega.Web.Infrastructure
{
    using Company.Common.Dal.Infrastructure;
    using Company.Vega.Dal.Infrastructure;
    using Company.Vega.Services.Vega.Services.Features;
    using Company.Vega.Services.Vega.Services.Features.Concrete;
    using Company.Vega.Services.Vega.Services.Makers;
    using Company.Vega.Services.Vega.Services.Makers.Concrete;
    using Company.Vega.Services.Vega.Services.Models;
    using Company.Vega.Services.Vega.Services.Models.Concrete;
    using Company.Vega.Services.Vega.Services.Owners;
    using Company.Vega.Services.Vega.Services.Owners.Concrete;
    using Company.Vega.Services.Vega.Services.Vehicles;
    using Company.Vega.Services.Vega.Services.Vehicles.Concrete;

    using Microsoft.Extensions.DependencyInjection;

    public static class ServicesExtensions
    {
        /// <summary>
        /// Application services registration
        /// </summary>
        /// <param name="services"></param>
        /// <param name="connectionString"></param>
        /// <returns></returns>
        public static IServiceCollection AddVegaServices(
            this IServiceCollection services,
            string connectionString)
        {

            services.AddScoped<ISessionFactory, VegaSessionFactory>(provider => new VegaSessionFactory(connectionString));
            services.AddScoped<IVehiclesService, VehiclesService>();
            services.AddScoped<IMakersListService, MakersListService>();
            services.AddScoped<IModelsListService, ModelsListService>();
            services.AddScoped<IFeaturesListService, FeaturesListService>();
            services.AddScoped<IOwnersListService, OwnersListService>();
            services.AddScoped<IVehiclesStatisticsService, VehiclesStatisticsService>();

            return services;
        }
    }
}