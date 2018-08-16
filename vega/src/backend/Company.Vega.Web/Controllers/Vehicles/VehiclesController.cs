namespace Company.Vega.Web.Controllers.Vehicles
{
    using AutoMapper;

    using Company.Common.Web.Controllers.Entity;
    using Company.Vega.Services.Vega.Models.Vehicles.Entity;
    using Company.Vega.Services.Vega.Models.Vehicles.Overviews;
    using Company.Vega.Services.Vega.Services.Vehicles;
    using Company.Vega.Web.Resources.Vehicles.Entity;
    using Company.Vega.Web.Resources.Vehicles.Overviews;

    public sealed class VehiclesController :
        IntIdEntityApiController<
            IVehiclesService,
            Vehicle,
            VehicleOverviewsRequest,
            VehicleOverviews,
            VehicleResource,
            VehicleOverviewsRequestResource,
            VehicleOverviewsResource>
    {
        public VehiclesController(IVehiclesService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}