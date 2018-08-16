namespace Company.Vega.Services.Vega.Services.Vehicles
{
    using Company.Common.Services.Services.Entity.Interfaces;
    using Company.Vega.Services.Vega.Models.Vehicles.Entity;
    using Company.Vega.Services.Vega.Models.Vehicles.Overviews;

    public interface IVehiclesService
        : IIntIdEntityService<Vehicle, VehicleOverviewsRequest, VehicleOverviews>
    {
    }
}