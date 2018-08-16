namespace Company.Common.Auth.Extensions
{
    using Microsoft.AspNetCore.Builder;

    public static class ApplicationExtentions
    {
        public static IApplicationBuilder UseAuth(
            this IApplicationBuilder app)
        {
            app.UseAuthentication();

            return app;
        }
    }
}