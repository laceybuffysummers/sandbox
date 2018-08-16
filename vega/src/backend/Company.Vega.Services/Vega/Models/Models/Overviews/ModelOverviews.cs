namespace Company.Vega.Services.Vega.Models.Models.Overviews
{
    using System.Collections.Generic;

    using Company.Common.Services.Models.Overviews;

    public sealed class ModelOverviews : OverviewsModel<ModelOverviewsRequest, ModelOverview>
    {
        public ModelOverviews(
            ModelOverviewsRequest request, 
            int recordsCount, 
            IEnumerable<ModelOverview> overviews)
            : base(request, recordsCount, overviews)
        {
        }
    }
}