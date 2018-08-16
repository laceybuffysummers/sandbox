namespace Company.Vega.Domain.Entities
{
    using System.Collections.Generic;

    using Company.Common.Domain.Entities;
    using Company.Common.Domain.Interfaces;

    public class FeatureEntity : IntIdEntity, INamedEntity
    {
        public string Name { get; set; }

        public virtual ICollection<ModelFeatureEntity> ModelFeatures { get; set; }
    }
}