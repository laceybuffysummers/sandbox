namespace Company.Vega.Web.Infrastructure
{
    using System.Collections.Generic;

    using AutoMapper;

    using Company.Common.Mapping.Infrastructure;
    using Company.Vega.Services.Vega.Models.Models.Lists;
    using Company.Vega.Services.Vega.Models.Vehicles.Entity;
    using Company.Vega.Services.Vega.Models.Vehicles.Overviews;
    using Company.Vega.Services.Vega.Models.Vehicles.Statistics;
    using Company.Vega.Web.Resources.Models.Lists;
    using Company.Vega.Web.Resources.Vehicles.Entity;
    using Company.Vega.Web.Resources.Vehicles.Overviews;
    using Company.Vega.Web.Resources.Vehicles.Statistics;

    public sealed class VegaResourcesProfile : ResourcesProfile
    {
        public VegaResourcesProfile()
        {
            // Statistics
            this.CreateMap<VehiclesByMakerData, VehiclesByMakerDataResource>()
                .ConstructUsing(
                    m => new VehiclesByMakerDataResource(
                        m.MakerId,
                        m.Maker,
                        m.VehiclesNumber));

            this.CreateMap<VehiclesByMakerItem, VehiclesByMakerItemResource>()
                .ConstructUsing(
                    m => new VehiclesByMakerItemResource(
                        m.Label,
                        Mapper.Map<VehiclesByMakerDataResource>(m.Data)));

            this.CreateMap<VehiclesByMakerStatistics, VehiclesByMakerStatisticsResource>()
                .ConstructUsing(
                    m => new VehiclesByMakerStatisticsResource(
                        Mapper.Map<IEnumerable<VehiclesByMakerItemResource>>(m.Items)));

            // Lists
            this.CreateMap<ModelsListRequestResource, ModelsListRequest>()
                .ConstructUsing(
                    r => new ModelsListRequest(r.Makers))
                .ReverseMap()
                .ConstructUsing(
                    m => new ModelsListRequestResource(m.Makers));

            // Requests
            this.CreateMap<VehicleOverviewsRequestResource, VehicleOverviewsRequest>()
                .ConstructUsing(
                    r => new VehicleOverviewsRequest(
                        r.Makers,
                        r.Models,
                        r.Features,
                        r.ContactName,
                        r.SortBy,
                        r.Desc,
                        r.PageSize,
                        r.PageNumber))
                .ReverseMap()
                .ConstructUsing(
                    m => new VehicleOverviewsRequestResource(
                        m.Makers,
                        m.Models,
                        m.Features,
                        m.ContactName,
                        m.SortBy,
                        m.Desc,
                        m.PageSize,
                        m.PageNumber));

            // Overviews
            this.CreateMap<VehicleOverview, VehicleOverviewResource>()
                .ConstructUsing(
                    m => new VehicleOverviewResource(
                        m.VehicleId,
                        m.Maker,
                        m.Model,
                        m.ContactName));

            this.CreateMap<VehicleOverviews, VehicleOverviewsResource>()
                .ConstructUsing(
                    m => new VehicleOverviewsResource(
                        Mapper.Map<VehicleOverviewsRequestResource>(m.Request),
                        m.RecordsCount,
                        Mapper.Map<IEnumerable<VehicleOverviewResource>>(m.Overviews)));

            // CRUD
            this.CreateMap<VehiclePhotoResource, VehiclePhoto>()
                .ConstructUsing(
                    r => new VehiclePhoto(
                        r.Id,
                        r.FileName,
                        r.OriginalFileName,
                        r.MimeType,
                        r.VehicleId))
                .ReverseMap()
                .ConstructUsing(
                    m => new VehiclePhotoResource(
                        m.Id,
                        m.FileName,
                        m.OriginalFileName,
                        m.MimeType,
                        m.VehicleId));

            this.CreateMap<VehicleResource, Vehicle>()
                .ConstructUsing(
                    r => new Vehicle(
                        r.Id,
                        r.MakerId,
                        r.ModelId,
                        r.OwnerId,
                        r.IsRegistered,
                        r.Description,
                        Mapper.Map<IEnumerable<VehiclePhoto>>(r.Photos)))
                .ReverseMap()
                .ConstructUsing(
                    m => new VehicleResource(
                        m.Id,
                        m.MakerId,
                        m.ModelId,
                        m.OwnerId,
                        m.IsRegistered,
                        m.Description,
                        Mapper.Map<IEnumerable<VehiclePhotoResource>>(m.Photos)));
        }
    }
}