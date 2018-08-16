namespace Company.Common.Services.Services.Lists
{
    using System;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public abstract class GuidIdNoRequestListService<TEntity>
        : NoRequestListService<TEntity, Guid>
        where TEntity : GuidIdEntity, INamedEntity
    {
        protected GuidIdNoRequestListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}