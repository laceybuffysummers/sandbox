namespace Company.Vega.Dal.EntityConfigurations
{
    using Company.Vega.Domain.Entities;

    using Microsoft.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore.Metadata.Builders;

    internal sealed class OwnerConfiguration : IEntityTypeConfiguration<OwnerEntity>
    {
        public void Configure(EntityTypeBuilder<OwnerEntity> builder)
        {
            builder.HasKey(e => e.Id);

            builder.Property(e => e.FirstName).HasMaxLength(20).IsRequired();
            builder.Property(e => e.LastName).HasMaxLength(20).IsRequired();
            builder.Property(e => e.Phone).HasMaxLength(30).IsRequired();
            builder.Property(e => e.Email).HasMaxLength(255).IsRequired();

            builder.ToTable("Owners");
        }
    }
}