namespace Company.Common.Services.Models.Overviews
{
    using System.Collections.Generic;

    using Company.Common.DataAnnotations.Attributes.Numbers;

    public abstract class OverviewsModel<TRequest, TOverview>
    {
        protected OverviewsModel(
            TRequest request,
            int recordsCount,
            IEnumerable<TOverview> overviews)
        {
            this.Request = request;
            this.RecordsCount = recordsCount;
            this.Overviews = overviews;
        }

        public TRequest Request { get; }

        [MinIntValue(0)]
        public int RecordsCount { get; }

        public IEnumerable<TOverview> Overviews { get; }
    }
}