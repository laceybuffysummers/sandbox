namespace Company.Vega.Web.Resources.Vehicles.Overviews
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Company.Common.DataAnnotations.Attributes.Data;
    using Company.Common.Web.Resources.Overviews;

    public sealed class VehicleOverviewsRequestResource : OverviewsRequestResource
    {
        public VehicleOverviewsRequestResource()
        {            
        }

        public VehicleOverviewsRequestResource(
            IEnumerable<int> makers,
            IEnumerable<int> models,
            IEnumerable<int> features,
            string contactName,
            string sortBy, 
            bool desc,
            int? pageSize, 
            int? pageNumber)
            : base(sortBy, desc, pageSize, pageNumber)
        {
            this.Makers = makers;
            this.Models = models;
            this.Features = features;
            this.ContactName = contactName;
        }

        [IntIds]
        public IEnumerable<int> Makers { get; set; }

        [IntIds]
        public IEnumerable<int> Models { get; set; }

        [IntIds]
        public IEnumerable<int> Features { get; set; }

        [MaxLength(40)]
        public string ContactName { get; set; }
    }
}