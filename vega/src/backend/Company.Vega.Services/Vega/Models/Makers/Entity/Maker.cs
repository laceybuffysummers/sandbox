namespace Company.Vega.Services.Vega.Models.Makers.Entity
{
    using System.ComponentModel.DataAnnotations;

    using Company.Common.Services.Models.Business;

    public sealed class Maker: IntIdBusinessModel
    {
        public Maker(int id, string name)
            : base(id)
        {
            this.Name = name;
        }

        [Required]
        [MaxLength(50)]
        public string Name { get; }
    }
}