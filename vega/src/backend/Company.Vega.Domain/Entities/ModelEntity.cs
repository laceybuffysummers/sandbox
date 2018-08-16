namespace Company.Vega.Domain.Entities
{
    using System.Collections.Generic;

    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public class ModelEntity : IntIdEntity, INamedEntity
    {
        public string Name { get; set; }

        public int MakerId { get; set; }

        public virtual MakerEntity Maker { get; set; }

        public virtual ICollection<ModelFeatureEntity> ModelFeatures { get; set; }

        public virtual ICollection<VehicleEntity> Vehicles { get; set; }
    }
}