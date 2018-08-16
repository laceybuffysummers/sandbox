namespace Company.Vega.Services.Vega.Models.Vehicles.Statistics
{
    public sealed class VehiclesByMakerData
    {
        public VehiclesByMakerData(
            int makerId, 
            string maker, 
            int vehiclesNumber)
        {
            this.MakerId = makerId;
            this.Maker = maker;
            this.VehiclesNumber = vehiclesNumber;
        }

        public int MakerId { get; }

        public string Maker { get; }

        public int VehiclesNumber { get; }
    }
}