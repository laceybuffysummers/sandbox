namespace Company.Common.Services.Services.Statistics.Interfaces
{
    using Company.Common.Services.Models.Statistics;
    public interface INoRequestStatisticsService<TData> : IStatisticsService<EmptyStatisticsRequest, TData>
    {        
    }
}