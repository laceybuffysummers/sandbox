namespace Company.Vega.Dal.Infrastructure
{
    using Microsoft.EntityFrameworkCore;

    public class VegaSqlServerDbContext : VegaDbContext
    {
        public VegaSqlServerDbContext(string connectionString)
            : base(connectionString)
        {
        }

        public VegaSqlServerDbContext(DbContextOptions options)
            : base(options)
        {            
        }
    }
}