namespace Company.Vega.Web.Resources.Vehicles.Overviews
{
    using System.ComponentModel.DataAnnotations;

    using Company.Common.DataAnnotations.Attributes.Data;

    public sealed class VehicleOverviewResource
    {
        public VehicleOverviewResource()
        {            
        }

        public VehicleOverviewResource(
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
        public int VehicleId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Maker { get; set; }

        [Required]
        [MaxLength(50)]
        public string Model { get; set; }

        [Required]
        [MaxLength(40)]
        public string ContactName { get; set; }
    }
}