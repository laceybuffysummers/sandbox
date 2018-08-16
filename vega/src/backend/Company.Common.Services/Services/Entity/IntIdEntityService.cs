namespace Company.Common.Services.Services.Entity
{
    using AutoMapper;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Services.Models.Business;

    public abstract class IntIdEntityService<TEntity, TModel, TOverviewsRequest, TOverviews>
        : EntityService<TEntity, TModel, int, TOverviewsRequest, TOverviews>
        where TEntity : IntIdEntity
        where TModel : IntIdBusinessModel
    {
        protected IntIdEntityService(IUnitOfWorkFactory unitOfWorkFactory, IMapper mapper)
            : base(unitOfWorkFactory, mapper)
        {
        }
    }
}