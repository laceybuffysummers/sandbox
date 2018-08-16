namespace Company.Common.Services.Models.Statistics
{
    using System.Collections.Generic;

    public class Statistics<TRequest, TData>
    {
        public Statistics(
            TRequest request, 
            IEnumerable<StatisticsItem<TData>> items)
        {
            this.Request = request;
            this.Items = items;
        }

        public TRequest Request { get; }

        public IEnumerable<StatisticsItem<TData>> Items { get; }
    }
}