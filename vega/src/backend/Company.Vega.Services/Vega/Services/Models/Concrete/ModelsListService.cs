namespace Company.Vega.Services.Vega.Services.Models.Concrete
{
    using System.Linq;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Services.Lists;
    using Company.Vega.Domain.Entities;
    using Company.Vega.Services.Vega.Models.Models.Lists;
    using Company.Vega.Services.Vega.Specifications;

    public sealed class ModelsListService
        : IntIdModelsListService<ModelEntity, ModelsListRequest>, IModelsListService
    {
        public ModelsListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }

        protected override IQueryable<ModelEntity> GetEntitiesQuery(
            IRepository<ModelEntity> rep, 
            ModelsListRequest request)
        {
            return rep.GetAll()
                    .GetByMakers(request.Makers);
        }
    }
}