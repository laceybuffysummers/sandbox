namespace Company.Common.Dal.Infrastructure
{
    public interface ISessionFactory
    {
        IDbContext GetSession();

        IDbContext GetSession(string connectionString);

        IDbContext GetSessionWithDisabledLazyLoading();

        IDbContext GetSessionWithDisabledLazyLoading(string connectionString);
    }
}