namespace Company.Common.Web.Controllers.Lists
{
    using AutoMapper;

    using Company.Common.Services.Models.Lists;
    using Company.Common.Services.Services.Lists.Interfaces;
    using Company.Common.Web.Resources.Lists;

    public abstract class NoRequestListApiController<TService>
        : ModelsListApiController<TService, EmptyListRequest, EmptyListRequestResource>
        where TService : INoRequestListService
    {
        protected NoRequestListApiController(TService service, IMapper mapper)
            : base(service, mapper)
        {
        }
    }
}