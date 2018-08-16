namespace Company.Common.Mapping.Infrastructure
{
    using System.Collections.Generic;

    using AutoMapper;

    using Company.Common.Services.Models.Lists;
    using Company.Common.Services.Models.Statistics;
    using Company.Common.Web.Resources.Lists;
    using Company.Common.Web.Resources.Statistics;

    public class ResourcesProfile : Profile
    {
        public ResourcesProfile()
        {
            // Statistics
            this.CreateMap<EmptyStatisticsRequest, EmptyStatisticsRequestResource>()
                .ConstructUsing(
                    m => new EmptyStatisticsRequestResource());

            this.CreateMap<NoRequestIntStatistics, NoRequestIntStatisticsResource>()
                .ConstructUsing(
                    m => new NoRequestIntStatisticsResource());

            // Lists
            this.CreateMap<ModelItem, ModelItemResource>()
                .ConstructUsing(
                    m => new ModelItemResource(m.Value, m.Text));

            this.CreateMap<EmptyListRequestResource, EmptyListRequest>()
                .ConstructUsing(
                    r => new EmptyListRequest())
                .ReverseMap()
                .ConstructUsing(
                    m => new EmptyListRequestResource());

            this.CreateMap<ModelsList<EmptyListRequest>, ModelsListResource<EmptyListRequestResource>>()
                .ConstructUsing(
                    m => new ModelsListResource<EmptyListRequestResource>(
                        Mapper.Map<EmptyListRequestResource>(m.Request),
                        Mapper.Map<IEnumerable<ModelItemResource>>(m.Items)));

            this.CreateMap<NoRequestModelsList, NoRequestListResource>()
                .ConstructUsing(
                    m => new NoRequestListResource());
        }
    }
}