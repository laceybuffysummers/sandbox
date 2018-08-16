namespace Company.Common.Web.Controllers.Entity
{
    using System;

    using AutoMapper;

    using Company.Common.Services.Models.Business;
    using Company.Common.Services.Services.Entity.Interfaces;

    public abstract class GuidIdEntityApiController
        <TService, TModel, TOverviewsRequest, TOverviews, TResource, TOverviewsRequestResource, TOverviewsResource> :
            EntityApiController<TService, TModel, Guid, TOverviewsRequest, TOverviews, TResource, TOverviewsRequestResource, TOverviewsResource>
        where TService : IGuidIdEntityService<TModel, TOverviewsRequest, TOverviews>
        where TModel : GuidIdBusinessModel
    {
        protected GuidIdEntityApiController(TService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}