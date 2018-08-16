namespace Company.Common.Services.Models.Business
{
    public abstract class IntIdBusinessModel : BusinessModel<int>
    {
        protected IntIdBusinessModel(int id)
            : base(id)
        {
        }
    }
}