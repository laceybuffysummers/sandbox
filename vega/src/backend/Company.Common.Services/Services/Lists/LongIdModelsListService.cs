namespace Company.Common.Services.Services.Lists
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public abstract class LongIdModelsListService<TEntity, TRequest>
        : ModelsListService<TEntity, long, TRequest>
        where TEntity : LongIdEntity, INamedEntity
    {
        protected LongIdModelsListService(IUnitOfWorkFactory unitOfWorkFactory) : base(unitOfWorkFactory)
        {
        }
    }
}