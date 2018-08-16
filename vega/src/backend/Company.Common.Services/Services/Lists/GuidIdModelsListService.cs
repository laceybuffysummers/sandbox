namespace Company.Common.Services.Services.Lists
{
    using System;
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public abstract class GuidIdModelsListService<TEntity, TRequest>
        : ModelsListService<TEntity, Guid, TRequest>
        where TEntity : GuidIdEntity, INamedEntity
    {
        protected GuidIdModelsListService(IUnitOfWorkFactory unitOfWorkFactory) : base(unitOfWorkFactory)
        {
        }
    }
}