namespace Company.Vega.Domain.Entities
{
    using System.Collections.Generic;

    using Company.Common.Domain.Entities;

    public class VehicleEntity : IntIdEntity
    {
        public int ModelId { get; set; }

        public int OwnerId { get; set; }

        public bool IsRegistered { get; set; }

        public string Description { get; set; }

        public virtual ModelEntity Model { get; set; }

        public virtual OwnerEntity Owner { get; set; }

        public virtual ICollection<PhotoEntity> Photos { get; set; }
    }
}