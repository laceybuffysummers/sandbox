namespace Company.Common.Services.Services.Entity.Interfaces
{
    using Company.Common.Services.Models.Business;

    public interface IIntIdEntityService<TModel, in TOverviewsRequest, TOverviews>
        : IEntityService<TModel, int, TOverviewsRequest, TOverviews>
        where TModel : IntIdBusinessModel
    {
    }
}