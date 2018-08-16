namespace Company.Vega.Services.Vega.Models.Models.Lists
{
    using System.Collections.Generic;

    using Company.Common.DataAnnotations.Attributes.Data;

    public sealed class ModelsListRequest
    {
        public ModelsListRequest(IEnumerable<int> makers)
        {
            this.Makers = makers;
        }

        [IntIds]
        public IEnumerable<int> Makers { get; }
    }
}