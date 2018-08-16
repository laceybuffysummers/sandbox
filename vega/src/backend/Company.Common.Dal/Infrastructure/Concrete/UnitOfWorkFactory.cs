namespace Company.Common.Dal.Infrastructure.Concrete
{
    public sealed class UnitOfWorkFactory : IUnitOfWorkFactory
    {
        private readonly ISessionFactory sessionFactory;

        public UnitOfWorkFactory(ISessionFactory sessionFactory)
        {
            this.sessionFactory = sessionFactory;
        }

        public IUnitOfWork Create()
        {
            return new UnitOfWork(this.sessionFactory.GetSession());
        }

        public IUnitOfWork Create(string connectionString)
        {
            return new UnitOfWork(this.sessionFactory.GetSession(connectionString));
        }

        public IUnitOfWork CreateWithDisabledLazyLoading()
        {
            return new UnitOfWork(this.sessionFactory.GetSessionWithDisabledLazyLoading());
        }

        public IUnitOfWork CreateWithDisabledLazyLoading(string connectionString)
        {
            return new UnitOfWork(this.sessionFactory.GetSessionWithDisabledLazyLoading(connectionString));
        }
    }
}