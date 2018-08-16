namespace Company.Common.Web.Resources.Business
{
    public abstract class BusinessResource<TId>
    {
        protected BusinessResource()
        {            
        }

        protected BusinessResource(TId id)
        {
            this.Id = id;
        }

        public TId Id { get; set; }

        public bool IsNew()
        {
            return this.Id.Equals(default(TId));
        }
    }
}