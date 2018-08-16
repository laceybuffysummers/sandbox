namespace Company.Common.Services.Models.Statistics
{
    using System.Collections.Generic;

    public class NoRequestStatistics<TData> : Statistics<EmptyStatisticsRequest, TData>
    {
        public NoRequestStatistics(IEnumerable<StatisticsItem<TData>> items)
            : base(new EmptyStatisticsRequest(), items)
        {
        }
    }
}