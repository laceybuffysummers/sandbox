namespace Company.Common.Web.Resources.Overviews
{
    using System.Collections.Generic;

    using Company.Common.DataAnnotations.Attributes.Numbers;

    public abstract class OverviewsResource<TRequest, TOverview>
    {
        protected OverviewsResource()
        {            
        }

        protected OverviewsResource(
            TRequest request,
            int recordsCount,
            IEnumerable<TOverview> overviews)
        {
            this.Request = request;
            this.RecordsCount = recordsCount;
            this.Overviews = overviews;
        }

        public TRequest Request { get; set; }

        [MinIntValue(0)]
        public int RecordsCount { get; set; }

        public IEnumerable<TOverview> Overviews { get; set; }
    }
}