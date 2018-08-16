namespace Company.Common.Web.Resources.Business
{
    using System;

    public abstract class GuidIdResource : BusinessResource<Guid>
    {
        protected GuidIdResource()
        {            
        }

        protected GuidIdResource(Guid id)
            : base(id)
        {
        }
    }
}
