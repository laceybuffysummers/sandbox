namespace Company.Common.Services.Services.Lists
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public abstract class IntIdModelsListService<TEntity, TRequest>
        : ModelsListService<TEntity, int, TRequest>
        where TEntity : IntIdEntity, INamedEntity
    {
        protected IntIdModelsListService(IUnitOfWorkFactory unitOfWorkFactory) : base(unitOfWorkFactory)
        {
        }
    }
}