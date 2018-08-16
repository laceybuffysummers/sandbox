namespace Company.Common.Services.Models.Business
{
    using System;

    public abstract class GuidIdBusinessModel : BusinessModel<Guid>
    {
        protected GuidIdBusinessModel(Guid id)
            : base(id)
        {
        }
    }
}