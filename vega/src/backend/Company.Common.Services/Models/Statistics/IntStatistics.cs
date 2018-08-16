namespace Company.Common.Services.Models.Statistics
{
    using System.Collections.Generic;

    public class IntStatistics<TRequest> : Statistics<TRequest, int>
    {
        public IntStatistics(TRequest request, IEnumerable<StatisticsItem<int>> items)
            : base(request, items)
        {
        }
    }
}