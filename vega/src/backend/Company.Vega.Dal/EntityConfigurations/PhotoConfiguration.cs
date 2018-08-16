namespace Company.Vega.Dal.EntityConfigurations
{
    using Company.Vega.Domain.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    internal sealed class PhotoConfiguration : IEntityTypeConfiguration<PhotoEntity>
    {
        public void Configure(EntityTypeBuilder<PhotoEntity> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.FileName).HasMaxLength(255).IsRequired();
            builder.Property(e => e.OriginalFileName).HasMaxLength(255).IsRequired();
            builder.Property(e => e.MimeType).HasMaxLength(255).IsRequired();
            builder.Property(e => e.VehicleId).IsRequired();

            builder.HasOne(e => e.Vehicle)
                .WithMany(e => e.Photos)
                .HasForeignKey(e => e.VehicleId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.ToTable("Photos");
        }
    }
}