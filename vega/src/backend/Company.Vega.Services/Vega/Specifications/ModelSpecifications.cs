namespace Company.Vega.Services.Vega.Specifications
{
    using System.Collections.Generic;
    using System.Linq;

    using Company.Vega.Domain.Entities;

    internal static class ModelSpecifications
    {
        internal static IQueryable<ModelEntity> GetByMakers(
            this IQueryable<ModelEntity> query,
            IEnumerable<int> makers)
        {
            if (makers == null)
            {
                return query;
            }

            var enumerable = makers as int[] ?? makers.ToArray();
            if (enumerable.Any())
            {
                query = query.Where(e => enumerable.Contains(e.MakerId));
            }

            return query;
        }

        internal static IQueryable<ModelEntity> GetByMaker(
            this IQueryable<ModelEntity> query,
            int? maker)
        {
            if (maker.HasValue)
            {
                query = query.Where(e => e.MakerId == maker);
            }            

            return query;
        }
    }
}