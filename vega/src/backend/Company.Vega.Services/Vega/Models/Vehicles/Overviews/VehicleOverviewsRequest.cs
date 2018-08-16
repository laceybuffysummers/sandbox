namespace Company.Vega.Services.Vega.Models.Vehicles.Overviews
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    using Company.Common.DataAnnotations.Attributes.Data;
    using Company.Common.Services.Models.Overviews;

    public sealed class VehicleOverviewsRequest : OverviewsRequestModel
    {
        public VehicleOverviewsRequest(
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
        public IEnumerable<int> Makers { get; }

        [IntIds]
        public IEnumerable<int> Models { get; }

        [IntIds]
        public IEnumerable<int> Features { get; }

        [MaxLength(40)]
        public string ContactName { get; }
    }
}