namespace Company.Vega.Services.Vega.Specifications
{
    using System.Collections.Generic;
    using System.Linq;

    using Company.Vega.Domain.Entities;

    internal static class VehicleSpecifications
    {
        internal static IQueryable<VehicleEntity> GetByMakers(
            this IQueryable<VehicleEntity> query,
            IEnumerable<int> makers)
        {
            if (makers == null)
            {
                return query;
            }

            var enumerable = makers as int[] ?? makers.ToArray();
            if (enumerable.Any())
            {
                query = query.Where(e => enumerable.Contains(e.Model.MakerId));
            }

            return query;
        }

        internal static IQueryable<VehicleEntity> GetByModels(
            this IQueryable<VehicleEntity> query,
            IEnumerable<int> models)
        {
            if (models == null)
            {
                return query;
            }

            var enumerable = models as int[] ?? models.ToArray();
            if (enumerable.Any())
            {
                query = query.Where(e => enumerable.Contains(e.ModelId));
            }

            return query;
        }

        internal static IQueryable<VehicleEntity> GetByFeatures(
            this IQueryable<VehicleEntity> query,
            IEnumerable<int> features)
        {
            if (features == null)
            {
                return query;
            }

            var enumerable = features as int[] ?? features.ToArray();
            if (enumerable.Any())
            {
                query = query.Where(e => e.Model.ModelFeatures.Any(f => enumerable.Contains(f.FeatureId)));
            }

            return query;
        }

        internal static IQueryable<VehicleEntity> GetByContactName(
            this IQueryable<VehicleEntity> query,
            string contactName)
        {
            if (!string.IsNullOrWhiteSpace(contactName))
            {
                var name = contactName.Trim().ToLower();
                query = query.Where(e => e.Owner.FirstName.Trim().ToLower().Contains(name) ||
                                         e.Owner.LastName.Trim().ToLower().Contains(name));
            }

            return query;
        }
    }
}