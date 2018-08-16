namespace Company.Vega.Domain.Entities
{
    public class ModelFeatureEntity
    {
        public int ModelId { get; set; }

        public int FeatureId { get; set; }

        public virtual ModelEntity Model { get; set; }

        public virtual FeatureEntity Feature { get; set; }
    }
}