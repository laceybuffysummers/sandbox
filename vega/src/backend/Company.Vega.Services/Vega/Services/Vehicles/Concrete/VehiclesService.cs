namespace Company.Vega.Services.Vega.Services.Vehicles.Concrete
{
    using System.Threading.Tasks;

    using AutoMapper;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Services.Entity;
    using Company.Vega.Domain.Entities;
    using Company.Vega.Services.Vega.Mappers;
    using Company.Vega.Services.Vega.Models.Vehicles.Entity;
    using Company.Vega.Services.Vega.Models.Vehicles.Overviews;
    using Company.Vega.Services.Vega.Services.Vehicles;

    public sealed class VehiclesService
        : IntIdEntityService<VehicleEntity, Vehicle, VehicleOverviewsRequest, VehicleOverviews>, IVehiclesService

    {
        public VehiclesService(IUnitOfWorkFactory unitOfWorkFactory, IMapper mapper)
            : base(unitOfWorkFactory, mapper)
        {
        }

        public override async Task<Vehicle> Read(int id)
        {
            using (var uow = this.CreateWithDisabledLazyLoading())
            {
                var vehiclesRep = uow.GetRepository<VehicleEntity>();
                var modelsRep = uow.GetRepository<ModelEntity>();

                return await VehiclesMapper.MapToVehicle(
                                            id,
                                            vehiclesRep.GetAll(),
                                            modelsRep.GetAll());
            }
        }

        protected override async Task<VehicleOverviews> DoGetOverviews(IUnitOfWork uow, VehicleOverviewsRequest request)
        {
            var vehiclesRep = uow.GetRepository<VehicleEntity>();
            var makersRep = uow.GetRepository<MakerEntity>();
            var modelsRep = uow.GetRepository<ModelEntity>();
            var ownersRep = uow.GetRepository<OwnerEntity>();

            return await VehiclesMapper.MapToVehicleOverviews(
                    request,
                    vehiclesRep.GetAll(),
                    makersRep.GetAll(),
                    modelsRep.GetAll(),
                    ownersRep.GetAll());
        }
    }
}