namespace Company.Common.Services.Models.Business
{
    public abstract class LongIdBusinessModel : BusinessModel<long>
    {
        protected LongIdBusinessModel(long id)
            : base(id)
        {
        }
    }
}