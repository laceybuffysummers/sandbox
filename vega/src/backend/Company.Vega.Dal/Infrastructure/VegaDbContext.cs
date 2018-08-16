namespace Company.Vega.Dal.Infrastructure
{
    using Company.Common.Dal.Infrastructure.Concrete;
    using Company.Vega.Dal.EntityConfigurations;
    using Company.Vega.Domain.Entities;

    using Microsoft.EntityFrameworkCore;

    public class VegaDbContext : DatabaseContext
    {
        public VegaDbContext(string connectionString)
            : base(connectionString)
        {
        }

        public VegaDbContext(DbContextOptions options)
            : base(options)
        {            
        }

        public DbSet<MakerEntity> Makers { get; set; }   

        public DbSet<ModelEntity> Models { get; set; }   

        public DbSet<FeatureEntity> Features { get; set; }   

        public DbSet<ModelFeatureEntity> ModelsFeatures { get; set; }   

        public DbSet<OwnerEntity> Owners { get; set; }   

        public DbSet<VehicleEntity> Vehicles { get; set; }   

        public DbSet<PhotoEntity> Photos { get; set; }   

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfiguration(new MakerConfiguration());
            modelBuilder.ApplyConfiguration(new ModelConfiguration());
            modelBuilder.ApplyConfiguration(new FeatureConfiguration());
            modelBuilder.ApplyConfiguration(new ModelFeatureConfiguration());
            modelBuilder.ApplyConfiguration(new OwnerConfiguration());
            modelBuilder.ApplyConfiguration(new VehicleConfiguration());
            modelBuilder.ApplyConfiguration(new PhotoConfiguration());

            base.OnModelCreating(modelBuilder);
        }
    }
}