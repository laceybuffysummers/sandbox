namespace Company.Common.Services.Services.Entity.Interfaces
{
    using System;

    using Company.Common.Services.Models.Business;

    public interface IGuidIdEntityService<TModel, in TOverviewsRequest, TOverviews>
        : IEntityService<TModel, Guid, TOverviewsRequest, TOverviews>
        where TModel : GuidIdBusinessModel
    {
    }
}
