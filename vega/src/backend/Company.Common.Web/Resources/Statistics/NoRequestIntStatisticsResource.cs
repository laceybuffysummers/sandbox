namespace Company.Common.Web.Resources.Statistics
{
    using System.Collections.Generic;

    public class NoRequestIntStatisticsResource : StatisticsResource<EmptyStatisticsRequestResource, int>
    {
        public NoRequestIntStatisticsResource()
        {            
        }

        public NoRequestIntStatisticsResource(
            EmptyStatisticsRequestResource request, IEnumerable<StatisticsItemResource<int>> items)
            : base(request, items)
        {
        }
    }
}