namespace Company.Common.Web.Resources.Lists
{
    using System.Collections.Generic;

    public class ModelsListResource<TRequest>
    {
        public ModelsListResource()
        {            
        }

        public ModelsListResource(
            TRequest request,
            IEnumerable<ModelItemResource> items)
        {
            this.Request = request;
            this.Items = items;
        }

        public TRequest Request { get; }

        public IEnumerable<ModelItemResource> Items { get; set; }
    }
}