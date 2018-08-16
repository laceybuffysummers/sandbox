namespace Company.Common.Services.Models.Lists
{
    using System.Collections.Generic;

    public class ModelsList<TRequest>
    {
        public ModelsList(
            TRequest request,
            IEnumerable<ModelItem> items)
        {
            this.Request = request;
            this.Items = items;
        }

        public TRequest Request { get; }

        public IEnumerable<ModelItem> Items { get; }
    }
}