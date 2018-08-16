namespace Company.Common.Dal.Infrastructure
{
    public interface IUnitOfWorkFactory
    {
        IUnitOfWork Create();

        IUnitOfWork Create(string connectionString);

        IUnitOfWork CreateWithDisabledLazyLoading();

        IUnitOfWork CreateWithDisabledLazyLoading(string connectionString);
    }
}