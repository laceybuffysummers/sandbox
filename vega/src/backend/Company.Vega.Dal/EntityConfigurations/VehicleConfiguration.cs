namespace Company.Vega.Dal.EntityConfigurations
{
    using Company.Vega.Domain.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    internal sealed class VehicleConfiguration : IEntityTypeConfiguration<VehicleEntity>
    {
        public void Configure(EntityTypeBuilder<VehicleEntity> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.ModelId).IsRequired();
            builder.Property(e => e.OwnerId).IsRequired();
            builder.Property(e => e.IsRegistered).HasDefaultValue(false).IsRequired();
            builder.Property(e => e.Description).IsRequired(false);

            builder.HasOne(e => e.Model)
                .WithMany(e => e.Vehicles)
                .HasForeignKey(e => e.ModelId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Owner)
                .WithMany(e => e.Vehicles)
                .HasForeignKey(e => e.OwnerId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.ToTable("Vehicles");
        }
    }
}