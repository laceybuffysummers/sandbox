namespace Company.Common.Dal.Infrastructure
{
    using System.Collections.Generic;
    using System.Threading.Tasks;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.ChangeTracking;

    public interface IDbContext
    {
        DbSet<T> Set<T>() where T : class;

        EntityEntry<T> Entry<T>(T entity) where T : class;

        int Commit();

        void Dispose();

        string GetTableName<T>();

        void ExecuteCommand(string command, params object[] parameters);

        void BulkAdd<T>(IEnumerable<T> entities);

        Task<int> CommitAsync();
    }
}