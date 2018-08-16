namespace Company.Vega.Services.Vega.Services.Vehicles.Concrete
{
    using System.Threading.Tasks;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Models.Statistics;
    using Company.Common.Services.Services.Statistics;
    using Company.Vega.Domain.Entities;
    using Company.Vega.Services.Vega.Mappers;
    using Company.Vega.Services.Vega.Models.Vehicles.Statistics;

    public sealed class VehiclesStatisticsService
        : NoRequestStatisticsService<VehiclesByMakerData>, IVehiclesStatisticsService
    {
        public VehiclesStatisticsService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }

        protected override async Task<Statistics<EmptyStatisticsRequest, VehiclesByMakerData>> DoGetStatistics(IUnitOfWork uow, EmptyStatisticsRequest request)
        {
            var vehiclesRep = uow.GetRepository<VehicleEntity>();
            var makersRep = uow.GetRepository<MakerEntity>();
            var modelsRep = uow.GetRepository<ModelEntity>();

            return await VehiclesMapper.MapToStatisticsByMakers(
                       vehiclesRep.GetAll(),
                       makersRep.GetAll(),
                       modelsRep.GetAll());
        }
    }
}