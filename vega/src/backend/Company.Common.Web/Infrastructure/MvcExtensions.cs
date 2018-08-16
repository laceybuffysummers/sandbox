namespace Company.Common.Web.Infrastructure
{
    using Microsoft.Extensions.DependencyInjection;

    using Newtonsoft.Json.Serialization;

    public static class MvcExtensions
    {
        public static IMvcBuilder UseCamelCaseJson(
            this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddJsonOptions(options =>
                {
                    options.SerializerSettings.ContractResolver =
                        new CamelCasePropertyNamesContractResolver();
                });


            return mvcBuilder;
        }
    }
}