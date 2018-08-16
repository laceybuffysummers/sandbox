namespace Company.Vega.Web.Controllers.Makers
{
    using AutoMapper;

    using Company.Common.Web.Constants;
    using Company.Common.Web.Controllers.Lists;
    using Company.Vega.Services.Vega.Services.Makers;

    using Microsoft.AspNetCore.Mvc;

    [Route(Routes.ApiRoute + "makers/list")]
    public sealed class MakersListController
        : NoRequestListApiController<IMakersListService>
    {
        public MakersListController(IMakersListService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}