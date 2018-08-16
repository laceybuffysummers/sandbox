namespace Company.Vega.Services.Vega.Models.Vehicles.Entity
{
    using System;
    using System.ComponentModel.DataAnnotations;

    using Company.Common.DataAnnotations.Attributes.Data;
    using Company.Common.Services.Models.Business;

    public sealed class VehiclePhoto : GuidIdBusinessModel
    {
        public VehiclePhoto(
            Guid id,
            string fileName, 
            string originaFileName,
            string mimeType,
            int vehicleId)
            : base(id)
        {
            this.FileName = fileName;
            this.OriginalFileName = originaFileName;
            this.MimeType = mimeType;
            this.VehicleId = vehicleId;
        }

        [Required]
        [MaxLength(255)]
        public string FileName { get; }

        [Required]
        [MaxLength(255)]
        public string OriginalFileName { get; }

        [Required]
        [MaxLength(255)]
        public string MimeType { get; }

        [IntId]
        public int VehicleId { get; }
    }
}