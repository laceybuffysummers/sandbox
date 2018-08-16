namespace Company.Vega.Services.Vega.Services.Vehicles
{
    using Company.Common.Services.Services.Statistics.Interfaces;
    using Company.Vega.Services.Vega.Models.Vehicles.Statistics;
    public interface IVehiclesStatisticsService : INoRequestStatisticsService<VehiclesByMakerData>
    {        
    }
}