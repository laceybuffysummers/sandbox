namespace Company.Vega.Services.Vega.Models.Vehicles.Statistics
{
    using Company.Common.Services.Models.Statistics;
    public sealed class VehiclesByMakerItem : StatisticsItem<VehiclesByMakerData>
    {
        public VehiclesByMakerItem(string label, VehiclesByMakerData data)
            : base(label, data)
        {
        }
    }
}