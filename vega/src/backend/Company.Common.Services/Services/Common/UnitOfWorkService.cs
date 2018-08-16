namespace Company.Common.Services.Services.Common
{
    using Company.Common.Dal.Infrastructure;

    public abstract class UnitOfWorkService
    {
        private readonly IUnitOfWorkFactory unitOfWorkFactory;

        private string connectionString;

        protected UnitOfWorkService(IUnitOfWorkFactory unitOfWorkFactory)
        {
            this.unitOfWorkFactory = unitOfWorkFactory;
        }

        public void SwitchToConnection(string connString)
        {
            this.connectionString = connString;
        }

        public void SwitchToDefaultConnection()
        {
            this.connectionString = null;
        }

        protected IUnitOfWork CreateUnitOfWork()
        {
            if (string.IsNullOrEmpty(this.connectionString))
            {
                return this.unitOfWorkFactory.Create();
            }

            return this.CreateUnitOfWork(this.connectionString);
        }

        protected IUnitOfWork CreateUnitOfWork(string connString)
        {
            return this.unitOfWorkFactory.Create(connString);
        }

        protected IUnitOfWork CreateWithDisabledLazyLoading(string connString)
        {
            return this.unitOfWorkFactory.CreateWithDisabledLazyLoading(connString);
        }

        protected IUnitOfWork CreateWithDisabledLazyLoading()
        {
            if (string.IsNullOrEmpty(this.connectionString))
            {
                return this.unitOfWorkFactory.CreateWithDisabledLazyLoading();
            }

            return this.CreateWithDisabledLazyLoading(this.connectionString);
        }
    }
}