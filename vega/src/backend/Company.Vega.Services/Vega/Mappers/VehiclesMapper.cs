namespace Company.Vega.Services.Vega.Mappers
{
    using System;
    using System.Linq;
    using System.Threading.Tasks;

    using Company.Common.Services.Specifications;
    using Company.Vega.Domain.Entities;
    using Company.Vega.Services.Vega.Models.Vehicles.Entity;
    using Company.Vega.Services.Vega.Models.Vehicles.Overviews;
    using Company.Vega.Services.Vega.Models.Vehicles.Statistics;
    using Company.Vega.Services.Vega.Specifications;

    using Microsoft.EntityFrameworkCore;

    internal static class VehiclesMapper
    {
        internal static async Task<Vehicle> MapToVehicle(
            int vehicleId,
            IQueryable<VehicleEntity> vehicles,
            IQueryable<ModelEntity> models)
        {
            // Build SQL query
            // some very unique strings
            const string Separator1 = "@$?!@";
            const string Separator2 = "#*%$#";
            const string Separator3 = "#$?!#";
            const string Separator4 = "@*%$@";
            var query = from v in vehicles.GetById(vehicleId)
                        join m in models on v.ModelId equals m.Id
                        select new 
                        {
                            v.Id,
                            m.MakerId,
                            v.ModelId,
                            v.OwnerId,
                            v.IsRegistered,
                            v.Description,
                            Photos = string.Concat(v.Photos.Select(p => 
                                p.Id + Separator1 + 
                                p.FileName + Separator2 +
                                p.OriginalFileName + Separator3 +
                                p.MimeType + Separator4))
                        };

            // Run SQL query
            var entity = await query.FirstAsync();
            var photos = entity.Photos
                .Split(new[] { Separator4 }, StringSplitOptions.RemoveEmptyEntries)
                .Select(
                    p =>
                    {
                        var arr1 = p.Split(new[] { Separator1 }, StringSplitOptions.RemoveEmptyEntries);
                        var arr2 = arr1[1].Split(new[] { Separator2 }, StringSplitOptions.RemoveEmptyEntries);
                        var arr3 = arr2[1].Split(new[] { Separator3 }, StringSplitOptions.RemoveEmptyEntries);
                        return new VehiclePhoto(
                            Guid.Parse(arr1[0]), 
                            arr2[0], 
                            arr3[0], 
                            arr3[1], 
                            entity.Id);
                    });

            // Map entities to models
            return new Vehicle(
                entity.Id,
                entity.MakerId,
                entity.ModelId,
                entity.OwnerId,
                entity.IsRegistered,
                entity.Description,
                photos);
        }

        internal static async Task<VehiclesByMakerStatistics> MapToStatisticsByMakers(
            IQueryable<VehicleEntity> vehicles,
            IQueryable<MakerEntity> makers,
            IQueryable<ModelEntity> models)
        {
            // Build SQL query
            var query = from v in vehicles
                        join m in models on v.ModelId equals m.Id
                        join mk in makers on m.MakerId equals mk.Id
                        group v by new { mk.Id, mk.Name } into g
                        select new
                                   {
                                       Label = g.Key.Name,
                                       MakerId = g.Key.Id,
                                       Maker = g.Key.Name,
                                       VehiclesNumber = g.Count()
                                   };
            // Run SQL query
            var entities = await query.ToArrayAsync();

            // Map entities to models
            var items = entities.Select(e => new VehiclesByMakerItem(
                                    e.Label, new VehiclesByMakerData(e.MakerId, e.Maker, e.VehiclesNumber)))
                                    .OrderBy(e => e.Label);

            return new VehiclesByMakerStatistics(items);
        }

        internal static async Task<VehicleOverviews> MapToVehicleOverviews(
            VehicleOverviewsRequest request,
            IQueryable<VehicleEntity> vehicles,
            IQueryable<MakerEntity> makers,
            IQueryable<ModelEntity> models,
            IQueryable<OwnerEntity> owners)
        {
            // Build SQL query
            var query1 = from v in vehicles.GetByMakers(request.Makers)
                            .GetByModels(request.Models)
                            .GetByFeatures(request.Features)
                            .GetByContactName(request.ContactName)
                        join m in models on v.ModelId equals m.Id
                        join mk in makers on m.MakerId equals mk.Id
                        join o in owners on v.OwnerId equals o.Id
                        select new
                                   {
                                       VehicleId = v.Id,
                                       Maker = mk,
                                       Model = m,
                                       Owner = o
                                   };

            var query = from q1 in query1
                        select new VehicleOverviewQuery
                        {
                            VehicleId = q1.VehicleId,
                            Maker = q1.Maker,
                            Model = q1.Model,
                            Owner = q1.Owner,
                            RecordsCount = query1.Count()
                        };

            var sortBy = new SortFields<VehicleOverviewQuery>
            {
                { "maker", e => e.Maker.Name },                     
                { "model", e => e.Model.Name },                     
                { "contact", e => e.Owner.LastName, e => e.Owner.FirstName  }                     
            };
            query = query
                    .SortBy(request, sortBy)
                    .GetPage(request);

            // Run SQL query
            var entities = await query.ToArrayAsync();

            // Map entities to models
            var overviews = entities.Select(e => new VehicleOverview(e.VehicleId, 
                                                                e.Maker.Name, 
                                                                e.Model.Name, 
                                                                $"{e.Owner.FirstName} {e.Owner.LastName}"));

            return new VehicleOverviews(
                            request,
                            entities.Any() ? entities.First().RecordsCount : 0,
                            overviews);
        }

        private class VehicleOverviewQuery
        {
            public int VehicleId { get; set; }

            public MakerEntity Maker { get; set; }

            public ModelEntity Model { get; set; }

            public OwnerEntity Owner { get; set; }

            public int RecordsCount { get; set; }
        }
    }
}