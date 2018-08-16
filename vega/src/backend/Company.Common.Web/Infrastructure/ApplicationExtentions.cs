namespace Company.Common.Web.Infrastructure
{
    using Microsoft.AspNetCore.Builder;

    public static class ApplicationExtentions
    {
        public static IApplicationBuilder UseCorsEnable(
            this IApplicationBuilder app)
        {
            app.UseCors(Constants.AllowCors);

            return app;
        }

        public static IApplicationBuilder UseSwaggerPage(
            this IApplicationBuilder app)
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
                {
                    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API");
                });

            return app;
        }
    }
}