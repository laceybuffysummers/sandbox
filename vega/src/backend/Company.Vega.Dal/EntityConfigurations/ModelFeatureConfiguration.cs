namespace Company.Vega.Dal.EntityConfigurations
{
    using Company.Vega.Domain.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    internal sealed class ModelFeatureConfiguration : IEntityTypeConfiguration<ModelFeatureEntity>
    {
        public void Configure(EntityTypeBuilder<ModelFeatureEntity> builder)
        {
            builder.HasKey(e => new { e.ModelId, e.FeatureId });

            builder.HasOne(e => e.Model)
                .WithMany(e => e.ModelFeatures)
                .HasForeignKey(e => e.ModelId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.HasOne(e => e.Feature)
                .WithMany(e => e.ModelFeatures)
                .HasForeignKey(e => e.FeatureId)
                .IsRequired()
                .OnDelete(DeleteBehavior.Restrict);

            builder.ToTable("ModelsFeatures");
        }
    }
}