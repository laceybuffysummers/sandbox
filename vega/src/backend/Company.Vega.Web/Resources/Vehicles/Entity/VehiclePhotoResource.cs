namespace Company.Vega.Web.Resources.Vehicles.Entity
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using Company.Common.DataAnnotations.Attributes.Data;
    using Company.Common.Web.Resources.Business;

    public sealed class VehiclePhotoResource : GuidIdResource
    {
        public VehiclePhotoResource()
        {            
        }

        public VehiclePhotoResource(
            Guid id,
            string fileName, 
            string originalFileName,
            string mimeType,
            int vehicleId)
            : base(id)
        {
            this.FileName = fileName;
            this.OriginalFileName = originalFileName;
            this.MimeType = mimeType;
            this.VehicleId = vehicleId;
        }

        [Required]
        [MaxLength(255)]
        public string FileName { get; set; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; set; }

        [Required]
        [MaxLength(255)]
        public string MimeType { get; set; }

        [IntId]
        public int VehicleId { get; set; }
    }
}