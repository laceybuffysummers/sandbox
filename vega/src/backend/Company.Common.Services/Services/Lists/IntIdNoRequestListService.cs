namespace Company.Common.Services.Services.Lists
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public abstract class IntIdNoRequestListService<TEntity>
        : NoRequestListService<TEntity, int>
        where TEntity : IntIdEntity, INamedEntity
    {
        protected IntIdNoRequestListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}