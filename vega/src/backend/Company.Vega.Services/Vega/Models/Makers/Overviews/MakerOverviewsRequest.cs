namespace Company.Vega.Services.Vega.Models.Makers.Overviews
{
    using System.ComponentModel.DataAnnotations;

    using Company.Common.Services.Models.Overviews;

    public sealed class MakerOverviewsRequest : OverviewsRequestModel
    {
        public MakerOverviewsRequest(
            string makerName,
            string sortBy, 
            bool desc, 
            int? pageSize, 
            int? pageNumber)
            : base(sortBy, desc, pageSize, pageNumber)
        {
            this.MakerName = makerName;
        }

        [Required]
        [MaxLength(50)]
        public string MakerName { get; }
    }
}