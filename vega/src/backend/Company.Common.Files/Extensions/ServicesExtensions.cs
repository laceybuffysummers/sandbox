namespace Company.Common.Files.Extensions
{
    using AutoMapper;

    using Company.Common.Files.Services;
    using Company.Common.Files.Services.Concrete;

    using Microsoft.Extensions.DependencyInjection;

    public static class ServicesExtensions
    {
        public static IServiceCollection AddFiles(
            this IServiceCollection services,
            string uploadFolder)
        {
            services.AddScoped<IEntityFilesService, EntityFilesService>(
                provider => new EntityFilesService(uploadFolder, provider.GetService<IMapper>()));

            return services;
        }
    }
}