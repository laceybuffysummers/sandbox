namespace Company.Vega.Services.Vega.Models.Vehicles.Overviews
{
    using System.ComponentModel.DataAnnotations;

    using Company.Common.DataAnnotations.Attributes.Data;

    public sealed class VehicleOverview
    {
        public VehicleOverview(
            int vehicleId, 
            string maker, 
            string model, 
            string contactName)
        {
            this.VehicleId = vehicleId;
            this.Maker = maker;
            this.Model = model;
            this.ContactName = contactName;
        }

        [IntId]
        public int VehicleId { get; }

        [Required]
        [MaxLength(50)]
        public string Maker { get; }

        [Required]
        [MaxLength(50)]
        public string Model { get; }

        [Required]
        [MaxLength(40)]
        public string ContactName { get; }
    }
}