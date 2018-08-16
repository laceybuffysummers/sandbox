namespace Company.Common.Web.Controllers.Entity
{
    using System.Threading.Tasks;

    using AutoMapper;

    using Company.Common.Services.Models.Business;
    using Company.Common.Services.Services.Entity.Interfaces;
    using Company.Common.Web.Controllers.Common;

    using Microsoft.AspNetCore.Mvc;

    public abstract class EntityApiController
        <TService, TBusinessModel, TId, TOverviewsRequest, TOverviews, TResource, TOverviewsRequestResource, TOverviewsResource>
        : ApiController
        where TService : IEntityService<TBusinessModel, TId, TOverviewsRequest, TOverviews>
        where TBusinessModel : BusinessModel<TId>
    {
        protected readonly TService Service;

        protected readonly IMapper Mapper;

        protected EntityApiController(TService service, IMapper mapper)
        {
            this.Service = service;
            this.Mapper = mapper;
        }

        [HttpGet("overviews")]
        public virtual async Task<IActionResult> Get([FromQuery] TOverviewsRequestResource requestResource)
        {
            var request = this.Mapper.Map<TOverviewsRequest>(requestResource);
            var overviews = await this.Service.GetOverviews(request);
            var overviewsResource = this.Mapper.Map<TOverviewsResource>(overviews);

            return this.Ok(overviewsResource);
        }

        [HttpGet("{id}")]
        public virtual async Task<IActionResult> Get([FromRoute] TId id)
        {
            var model = await this.Service.Read(id);
            var resource = this.Mapper.Map<TResource>(model);

            return this.Ok(resource);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Post([FromBody] TResource resource)
        {
            var model = this.Mapper.Map<TBusinessModel>(resource);
            var result = await this.Service.CreateOrUpdate(model);

            return this.Ok(this.Mapper.Map<TResource>(result));
        }

        [HttpPut("{id}")]
        public virtual async Task<IActionResult> Put([FromRoute] TId id, [FromBody] TResource resource)
        {
            var model = this.Mapper.Map<TBusinessModel>(resource);
            model.UpdateId(id);
            var result = await this.Service.CreateOrUpdate(model);

            return this.Ok(this.Mapper.Map<TResource>(result));
        }

        [HttpDelete("{id}")]
        public virtual async Task Delete([FromRoute] TId id)
        {
            await this.Service.Delete(id);
        }
    }
}