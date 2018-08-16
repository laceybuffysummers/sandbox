namespace Company.Common.Auth.Extensions
{
    using Microsoft.AspNetCore.Authentication.JwtBearer;
    using Microsoft.Extensions.DependencyInjection;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc.Authorization;

    public static class MvcExtensions
    {
        public static IMvcBuilder AddAuth(
            this IMvcBuilder mvcBuilder)
        {
            mvcBuilder.AddMvcOptions(config =>
                {
                    var policy = new AuthorizationPolicyBuilder()
                        .AddAuthenticationSchemes(JwtBearerDefaults.AuthenticationScheme)
                        .RequireAuthenticatedUser()
                        .Build();
                    config.Filters.Insert(0, new AuthorizeFilter(policy));
                });

            return mvcBuilder;
        }
    }
}