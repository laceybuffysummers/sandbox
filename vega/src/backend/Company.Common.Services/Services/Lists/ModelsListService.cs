namespace Company.Common.Services.Services.Lists
{
    using System.Linq;
    using System.Threading.Tasks;

    using Company.Common.Dal.Infrastructure;
    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;
    using Company.Common.Services.Mappers;
    using Company.Common.Services.Models.Lists;
    using Company.Common.Services.Services.Common;
    using Company.Common.Services.Services.Lists.Interfaces;

    public abstract class ModelsListService<TEntity, TId, TRequest>
        : UnitOfWorkService, IModelsListService<TRequest>
        where TEntity : Entity<TId>, INamedEntity
    {
        protected ModelsListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }

        protected virtual IQueryable<TEntity> GetEntitiesQuery(IRepository<TEntity> rep, TRequest request)
        {
            return rep.GetAll();
        }

        public virtual async Task<ModelsList<TRequest>> GetList(TRequest request)
        {
            using (var uow = this.CreateWithDisabledLazyLoading())
            {
                var rep = uow.GetRepository<TEntity>();

                return await ModelsListMapper.MapToModelsList<TEntity, TId, TRequest>(
                    this.GetEntitiesQuery(rep, request),
                    request);
            }
        }
    }
}