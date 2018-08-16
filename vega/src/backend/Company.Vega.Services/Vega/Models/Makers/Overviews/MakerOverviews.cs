namespace Company.Vega.Services.Vega.Models.Makers.Overviews
{
    using System.Collections.Generic;

    using Company.Common.Services.Models.Overviews;

    public sealed class MakerOverviews : OverviewsModel<MakerOverviewsRequest, MakerOverview>
    {
        public MakerOverviews(
            MakerOverviewsRequest request, 
            int recordsCount, 
            IEnumerable<MakerOverview> overviews)
            : base(request, recordsCount, overviews)
        {
        }
    }
}