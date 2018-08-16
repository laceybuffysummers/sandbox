namespace Company.Common.Services.Services.Statistics
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Models.Statistics;

    public abstract class NoRequestStatisticsService<TData>
        : StatisticsService<EmptyStatisticsRequest, TData>
    {
        protected NoRequestStatisticsService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}