namespace Company.Common.Dal.Infrastructure
{
    using System;
    using System.Threading.Tasks;

    public interface IUnitOfWork : IDisposable
    {
        IRepository<TSet> GetRepository<TSet>() where TSet : class;

        int Save();

        Task<int> SaveAsync();
    }
}