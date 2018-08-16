namespace Company.Common.Dal.Infrastructure.Concrete
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    public class UnitOfWork : IUnitOfWork
    {
        private readonly Dictionary<Type, object> repositories;

        private IDbContext context;

        public UnitOfWork(IDbContext context)
        {
            this.repositories = new Dictionary<Type, object>();
            this.context = context;
        }

        public IRepository<TSet> GetRepository<TSet>() where TSet : class
        {
            if (this.repositories.Keys.Contains(typeof(TSet)))
            {
                return this.repositories[typeof(TSet)] as IRepository<TSet>;
            }

            var repository = new Repository<TSet>(this.context);
            this.repositories.Add(typeof(TSet), repository);
            return repository;
        }

        public int Save()
        {
            return this.context.Commit();
        }

        public async Task<int> SaveAsync()
        {
            return await this.context.CommitAsync();
        }

        public void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (this.context != null)
                {
                    this.context.Dispose();
                    this.context = null;
                }
            }
        }
    }
}