namespace Company.Common.Services.Models.Business
{
    public abstract class BusinessModel<TId>
    {
        protected BusinessModel(TId id)
        {
            this.Id = id;
        }

        public TId Id { get; protected set; }

        public bool IsNew()
        {
            return this.Id.Equals(default(TId));
        }

        public void UpdateId(TId id)
        {
            this.Id = id;
        }
    }
}