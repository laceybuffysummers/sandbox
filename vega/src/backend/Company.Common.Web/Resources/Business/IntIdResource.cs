namespace Company.Common.Web.Resources.Business
{
    public abstract class IntIdResource : BusinessResource<int>
    {
        protected IntIdResource()
        {            
        }

        protected IntIdResource(int id)
            : base(id)
        {
        }
    }
}