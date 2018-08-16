namespace Company.Common.Services.Models.Lists
{
    using System.Collections.Generic;

    public sealed class NoRequestModelsList : ModelsList<EmptyListRequest>
    {
        public NoRequestModelsList(IEnumerable<ModelItem> items)
            : base(new EmptyListRequest(), items)
        {
        }
    }
}