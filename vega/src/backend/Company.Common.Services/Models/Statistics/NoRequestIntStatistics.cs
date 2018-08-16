namespace Company.Common.Services.Models.Statistics
{
    using System.Collections.Generic;

    public class NoRequestIntStatistics : Statistics<EmptyStatisticsRequest, int>
    {
        public NoRequestIntStatistics(EmptyStatisticsRequest request, IEnumerable<StatisticsItem<int>> items)
            : base(request, items)
        {
        }
    }
}