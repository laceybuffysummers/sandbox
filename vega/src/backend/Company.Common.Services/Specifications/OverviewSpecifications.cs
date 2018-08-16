namespace Company.Common.Services.Specifications
{
    using System.Linq;

    using Company.Common.Services.Models.Interfaces;

    public static class OverviewSpecifications
    {
        public static IQueryable<T> GetPage<T>(
            this IQueryable<T> query, 
            IPagable page) where T : class
        {
            if (page.PageSize.HasValue && page.PageNumber.HasValue)
            {
                query = query
                    .Skip(page.PageSize.Value * (page.PageNumber.Value - 1))
                    .Take(page.PageSize.Value);
            }

            return query;
        }

        public static IQueryable<T> SortBy<T>(
            this IQueryable<T> query,
            ISortable sort,
            SortFields<T> fields)
        {
            if (string.IsNullOrEmpty(sort.SortBy) || !fields.HasField(sort.SortBy))
            {
                return query;
            }

            var field = fields[sort.SortBy];
            for (var i = 0; i < field.Expressions.Count; i++)
            {
                var sortExpr = field.Expressions[i];
                if (i == 0)
                {
                    query = sort.Desc ? query.OrderByDescending(sortExpr) : query.OrderBy(sortExpr);
                    continue;
                }

                if (query is IOrderedQueryable<T>)
                {
                    query = ((IOrderedQueryable<T>)query).ThenBy(sortExpr);
                }
            }

            return query;
        }
    }
}