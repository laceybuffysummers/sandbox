namespace Company.Vega.Web.Controllers.Vehicles
{
    using AutoMapper;

    using Company.Common.Web.Constants;
    using Company.Common.Web.Controllers.Statistics;
    using Company.Vega.Services.Vega.Models.Vehicles.Statistics;
    using Company.Vega.Services.Vega.Services.Vehicles;

    using Microsoft.AspNetCore.Mvc;

    [Route(Routes.ApiRoute + "vehicles/statistics/bymakers")]
    public sealed class VehiclesStatisticsController
        : NoRequestStatisticsApiController<IVehiclesStatisticsService, VehiclesByMakerData>
    {
        public VehiclesStatisticsController(IVehiclesStatisticsService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}