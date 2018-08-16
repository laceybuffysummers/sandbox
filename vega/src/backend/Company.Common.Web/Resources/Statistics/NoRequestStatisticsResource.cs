namespace Company.Common.Web.Resources.Statistics
{
    using System.Collections.Generic;

    public class NoRequestStatisticsResource<TData> : StatisticsResource<EmptyStatisticsRequestResource, TData>
    {
        public NoRequestStatisticsResource()
        {            
        }

        public NoRequestStatisticsResource(IEnumerable<StatisticsItemResource<TData>> items)
            : base(new EmptyStatisticsRequestResource(), items)
        {
        }
    }
}