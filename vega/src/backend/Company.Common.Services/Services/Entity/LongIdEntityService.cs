namespace Company.Common.Services.Services.Entity
{
    using AutoMapper;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Services.Models.Business;

    public abstract class LongIdEntityService<TEntity, TModel, TOverviewsRequest, TOverviews>
        : EntityService<TEntity, TModel, long, TOverviewsRequest, TOverviews>
        where TEntity : LongIdEntity
        where TModel : LongIdBusinessModel
    {
        protected LongIdEntityService(IUnitOfWorkFactory unitOfWorkFactory, IMapper mapper)
            : base(unitOfWorkFactory, mapper)
        {
        }
    }
}