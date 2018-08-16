namespace Company.Vega.Web.Resources.Vehicles.Statistics
{
    using Company.Common.Web.Resources.Statistics;

    public sealed class VehiclesByMakerItemResource : StatisticsItemResource<VehiclesByMakerDataResource>
    {
        public VehiclesByMakerItemResource(string label, VehiclesByMakerDataResource DataResource)
            : base(label, DataResource)
        {
        }
    }
}