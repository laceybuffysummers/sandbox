namespace Company.Common.Services.Services.Entity
{
    using System;

    using AutoMapper;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Services.Models.Business;

    public abstract class GuidIdEntityService<TEntity, TModel, TOverviewsRequest, TOverviews>
        : EntityService<TEntity, TModel, Guid, TOverviewsRequest, TOverviews>
        where TEntity : GuidIdEntity
        where TModel : GuidIdBusinessModel
    {
        protected GuidIdEntityService(IUnitOfWorkFactory unitOfWorkFactory, IMapper mapper)
            : base(unitOfWorkFactory, mapper)
        {
        }
    }
}