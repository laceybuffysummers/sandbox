namespace Company.Common.Services.Services.Lists
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;
    using Company.Common.Services.Models.Lists;

    public abstract class NoRequestListService<TEntity, TId>
        : ModelsListService<TEntity, TId, EmptyListRequest>
        where TEntity : Entity<TId>, INamedEntity
    {
        protected NoRequestListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}