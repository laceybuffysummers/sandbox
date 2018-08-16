namespace Company.Vega.Services.Vega.Models.Models.Overviews
{
    using System.ComponentModel.DataAnnotations;

    using Company.Common.Services.Models.Overviews;

    public sealed class ModelOverviewsRequest : OverviewsRequestModel
    {
        public ModelOverviewsRequest(
            string modelName,
            string sortBy, 
            bool desc, 
            int? pageSize, 
            int? pageNumber)
            : base(sortBy, desc, pageSize, pageNumber)
        {
            this.ModelName = modelName;
        }

        [Required]
        [MaxLength(50)]
        public string ModelName { get; }
    }
}