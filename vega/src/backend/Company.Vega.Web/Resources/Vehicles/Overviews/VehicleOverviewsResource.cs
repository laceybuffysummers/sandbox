namespace Company.Vega.Web.Resources.Vehicles.Overviews
{
    using System.Collections.Generic;

    using Company.Common.Web.Resources.Overviews;

    public sealed class VehicleOverviewsResource
        : OverviewsResource<VehicleOverviewsRequestResource, VehicleOverviewResource>
    {
        public VehicleOverviewsResource()
        {            
        }

        public VehicleOverviewsResource(
            VehicleOverviewsRequestResource requestResource, 
            int recordsCount, 
            IEnumerable<VehicleOverviewResource> overviews)
            : base(requestResource, recordsCount, overviews)
        {
        }
    }
}