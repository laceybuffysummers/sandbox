namespace Company.Common.Services.Mappers
{
    using System.Linq;
    using System.Threading.Tasks;

    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;
    using Company.Common.Services.Models.Lists;

    using Microsoft.EntityFrameworkCore;

    internal static class ModelsListMapper
    {
        public static async Task<ModelsList<TRequest>> MapToModelsList<TEntity, TId, TRequest>(
            IQueryable<TEntity> entities,
            TRequest request) 
            where TEntity : Entity<TId>, INamedEntity
        {
            // Build SQL query
            var query = from e in entities
                        orderby e.Name
                        select new
                        {
                            e.Id, 
                            e.Name
                        };

            // Run SQL query
            var result = await query.ToArrayAsync();

            // Map entities to models
            return new ModelsList<TRequest>(
                request,
                result.Select(e => new ModelItem(e.Id.ToString(), e.Name)));
        }

        public static async Task<ModelsList<TRequest>> MapToPersonsList<TEntity, TId, TRequest>(
            IQueryable<TEntity> entities,
            TRequest request)
            where TEntity : Entity<TId>, INamedPerson
        {
            // Build SQL query
            var query = from e in entities
                        orderby e.LastName, e.FirstName
                        select new
                        {
                            e.Id,
                            e.FirstName,
                            e.LastName
                        };

            // Run SQL query
            var result = await query.ToArrayAsync();

            // Map entities to models
            return new ModelsList<TRequest>(
                request,
                result.Select(e => new ModelItem(
                    e.Id.ToString(), $"{e.FirstName} {e.LastName}")));
        }
    }
}