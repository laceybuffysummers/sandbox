namespace Company.Common.Web.Resources.Overviews
{
    using Company.Common.DataAnnotations.Attributes.Numbers;

    public abstract class OverviewsRequestResource
    {
        protected OverviewsRequestResource()
        {            
        }

        protected OverviewsRequestResource(
            string sortBy,
            bool desc,
            int? pageSize,
            int? pageNumber)
        {
            this.SortBy = sortBy;
            this.Desc = desc;
            this.PageSize = pageSize;
            this.PageNumber = pageNumber;
        }

        public string SortBy { get; set; }

        public bool Desc { get; set; }

        [MinIntValue(1)]
        public int? PageSize { get; set; }

        [MinIntValue(1)]
        public int? PageNumber { get; set; }
    }
}