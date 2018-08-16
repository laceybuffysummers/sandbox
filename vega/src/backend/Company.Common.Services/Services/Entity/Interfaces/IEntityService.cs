namespace Company.Common.Services.Services.Entity.Interfaces
{
    using System.Threading.Tasks;

    using Company.Common.Services.Models.Business;

    public interface IEntityService<TModel, in TId, in TOverviewsRequest, TOverviews>
        where TModel : BusinessModel<TId>
    {
        Task<TOverviews> GetOverviews(TOverviewsRequest request);

        Task<TModel> Read(TId id);

        Task<TModel> CreateOrUpdate(TModel model);

        Task Delete(TId id);
    }
}