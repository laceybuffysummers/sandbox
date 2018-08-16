namespace Company.Vega.Services.Vega.Models.Models.Overviews
{
    using System.ComponentModel.DataAnnotations;

    using Company.Common.DataAnnotations.Attributes.Data;

    public sealed class ModelOverview
    {
        public ModelOverview(
            int modelId, 
            string maker, 
            string name)
        {
            this.ModelId = modelId;
            this.Maker = maker;
            this.Name = name;
        }

        [IntId]
        public int ModelId { get; }

        [Required]
        [MaxLength(50)]
        public string Maker { get; }

        [Required]
        [MaxLength(50)]
        public string Name { get; }
    }
}