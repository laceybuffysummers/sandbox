namespace Company.Vega.Web.Controllers.Models
{
    using AutoMapper;

    using Company.Common.Web.Constants;
    using Company.Common.Web.Controllers.Lists;
    using Company.Vega.Services.Vega.Models.Models.Lists;
    using Company.Vega.Services.Vega.Services.Models;
    using Company.Vega.Web.Resources.Models.Lists;

    using Microsoft.AspNetCore.Mvc;

    [Route(Routes.ApiRoute + "models/list")]
    public sealed class ModelsListController
        : ModelsListApiController<
            IModelsListService,
            ModelsListRequest,
            ModelsListRequestResource>
    {
        public ModelsListController(IModelsListService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}