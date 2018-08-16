namespace Company.Vega.Web.Resources.Vehicles.Statistics
{
    public sealed class VehiclesByMakerDataResource
    {
        public VehiclesByMakerDataResource()
        {
        }

        public VehiclesByMakerDataResource(int makerId, string maker, int vehiclesNumber)
        {
            this.MakerId = makerId;
            this.Maker = maker;
            this.VehiclesNumber = vehiclesNumber;
        }

        public int MakerId { get; set; }

        public string Maker { get; set; }

        public int VehiclesNumber { get; set; }
    }
}