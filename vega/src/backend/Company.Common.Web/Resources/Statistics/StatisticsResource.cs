namespace Company.Common.Web.Resources.Statistics
{
    using System.Collections.Generic;

    public class StatisticsResource<TRequest, TData>
    {
        public StatisticsResource()
        {            
        }

        public StatisticsResource(
            TRequest request,
            IEnumerable<StatisticsItemResource<TData>> items)
        {
            this.Request = request;
            this.Items = items;
        }

        public TRequest Request { get; set; }

        public IEnumerable<StatisticsItemResource<TData>> Items { get; set; }
    }
}