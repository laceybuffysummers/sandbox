namespace Company.Vega.Services.Vega.Models.Vehicles.Overviews
{
    using System.Collections.Generic;

    using Company.Common.Services.Models.Overviews;

    public sealed class VehicleOverviews : OverviewsModel<VehicleOverviewsRequest, VehicleOverview>
    {
        public VehicleOverviews(
            VehicleOverviewsRequest request, 
            int recordsCount, 
            IEnumerable<VehicleOverview> overviews)
            : base(request, recordsCount, overviews)
        {
        }
    }
}