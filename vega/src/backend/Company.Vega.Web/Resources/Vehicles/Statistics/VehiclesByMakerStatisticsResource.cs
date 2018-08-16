namespace Company.Vega.Web.Resources.Vehicles.Statistics
{
    using System.Collections.Generic;

    using Company.Common.Web.Resources.Statistics;

    public sealed class VehiclesByMakerStatisticsResource
        : NoRequestStatisticsResource<VehiclesByMakerDataResource>
    {
        public VehiclesByMakerStatisticsResource()
        {            
        }

        public VehiclesByMakerStatisticsResource(
            IEnumerable<StatisticsItemResource<VehiclesByMakerDataResource>> items)
            : base(items)
        {
        }
    }
}