namespace Company.Common.Web.Resources.Business
{
    public abstract class LongIdResource : BusinessResource<long>
    {
        protected LongIdResource()
        {            
        }

        protected LongIdResource(long id)
            : base(id)
        {
        }
    }
}