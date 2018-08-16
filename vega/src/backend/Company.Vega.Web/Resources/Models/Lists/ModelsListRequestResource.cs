namespace Company.Vega.Web.Resources.Models.Lists
{
    using System.Collections.Generic;

    using Company.Common.DataAnnotations.Attributes.Data;

    public sealed class ModelsListRequestResource
    {
        public ModelsListRequestResource()
        {            
        }

        public ModelsListRequestResource(IEnumerable<int> makers)
        {
            this.Makers = makers;
        }

        [IntIds]
        public IEnumerable<int> Makers { get; set; }
    }
}