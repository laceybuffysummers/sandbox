namespace Company.Vega.Web.Controllers.Features
{
    using AutoMapper;

    using Company.Common.Web.Constants;
    using Company.Common.Web.Controllers.Lists;
    using Company.Vega.Services.Vega.Services.Features;

    using Microsoft.AspNetCore.Mvc;

    [Route(Routes.ApiRoute + "features/list")]
    public sealed class FeaturesListController
        : NoRequestListApiController<IFeaturesListService>
    {
        public FeaturesListController(IFeaturesListService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}