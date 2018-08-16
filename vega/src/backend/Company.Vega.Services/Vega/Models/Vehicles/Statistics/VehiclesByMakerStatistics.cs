namespace Company.Vega.Services.Vega.Models.Vehicles.Statistics
{
    using System.Collections.Generic;

    using Company.Common.Services.Models.Statistics;
    public sealed class VehiclesByMakerStatistics : NoRequestStatistics<VehiclesByMakerData>
    {
        public VehiclesByMakerStatistics(IEnumerable<StatisticsItem<VehiclesByMakerData>> items)
            : base(items)
        {
        }
    }
}