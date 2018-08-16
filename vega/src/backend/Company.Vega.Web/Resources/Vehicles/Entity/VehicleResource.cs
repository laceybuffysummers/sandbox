namespace Company.Vega.Web.Resources.Vehicles.Entity
{
    using System.Collections.Generic;

    using Company.Common.DataAnnotations.Attributes.Data;
    using Company.Common.Web.Resources.Business;

    public sealed class VehicleResource : IntIdResource
    {
        public VehicleResource()
        {            
        }

        public VehicleResource(
            int id,
            int makerId,
            int modelId, 
            int ownerId, 
            bool isRegistered,
            string description,
            IEnumerable<VehiclePhotoResource> photos)
            : base(id)
        {
            this.MakerId = makerId;
            this.ModelId = modelId;
            this.OwnerId = ownerId;
            this.IsRegistered = isRegistered;
            this.Description = description;
            this.Photos = photos;
        }

        [IntId]
        public int MakerId { get; set; }

        [IntId]
        public int ModelId { get; set; }

        [IntId]
        public int OwnerId { get; set; }

        public bool IsRegistered { get; set; }

        public string Description { get; set; }

        public IEnumerable<VehiclePhotoResource> Photos { get; set; }
    }
}