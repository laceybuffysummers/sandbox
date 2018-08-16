namespace Company.Common.Services.Services.Statistics
{
    using System.Threading.Tasks;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Models.Statistics;
    using Company.Common.Services.Services.Common;
    using Company.Common.Services.Services.Statistics.Interfaces;

    public abstract class StatisticsService<TRequest, TData>
        : UnitOfWorkService, IStatisticsService<TRequest, TData>
    {
        protected StatisticsService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }

        protected abstract Task<Statistics<TRequest, TData>> DoGetStatistics(IUnitOfWork uow, TRequest request);

        public virtual async Task<Statistics<TRequest, TData>> GetStatistics(TRequest request)
        {
            using (var uow = this.CreateWithDisabledLazyLoading())
            {
                return await this.DoGetStatistics(uow, request);
            }
        }
    }
}