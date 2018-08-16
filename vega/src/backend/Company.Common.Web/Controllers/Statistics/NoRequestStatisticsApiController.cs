namespace Company.Common.Web.Controllers.Statistics
{
    using AutoMapper;

    using Company.Common.Services.Models.Statistics;
    using Company.Common.Services.Services.Statistics.Interfaces;
    using Company.Common.Web.Resources.Statistics;

    public abstract class NoRequestStatisticsApiController<TService, TData>
        : StatisticsApiController<TService, EmptyStatisticsRequest, EmptyStatisticsRequestResource, TData>
        where TService : IStatisticsService<EmptyStatisticsRequest, TData>
    {
        protected NoRequestStatisticsApiController(TService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}