namespace Company.Common.Dal.Utils
{
    using Microsoft.EntityFrameworkCore;

    public static class DbContextExtensions
    {
        public static string GetDatabaseTableName<TEntity>(this DbContext context)
        {
            return context.Model.FindEntityType(typeof(TEntity).Name).SqlServer().TableName;
        }
    }
}