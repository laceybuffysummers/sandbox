namespace Company.Vega.Web.Controllers.Owners
{
    using AutoMapper;

    using Company.Common.Web.Constants;
    using Company.Common.Web.Controllers.Lists;
    using Company.Vega.Services.Vega.Services.Owners;

    using Microsoft.AspNetCore.Mvc;

    [Route(Routes.ApiRoute + "owners/list")]
    public sealed class OwnersListController
        : NoRequestListApiController<IOwnersListService>
    {
        public OwnersListController(IOwnersListService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}