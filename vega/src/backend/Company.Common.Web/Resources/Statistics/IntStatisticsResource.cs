namespace Company.Common.Web.Resources.Statistics
{
    using System.Collections.Generic;

    public class IntStatisticsResource<TRequest> : StatisticsResource<TRequest, int>
    {
        public IntStatisticsResource()
        {            
        }

        public IntStatisticsResource(TRequest request, IEnumerable<StatisticsItemResource<int>> items)
            : base(request, items)
        {
        }
    }
}