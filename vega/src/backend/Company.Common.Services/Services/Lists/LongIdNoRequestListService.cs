namespace Company.Common.Services.Services.Lists
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public abstract class LongIdNoRequestListService<TEntity>
        : NoRequestListService<TEntity, long>
        where TEntity : LongIdEntity, INamedEntity
    {
        protected LongIdNoRequestListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}