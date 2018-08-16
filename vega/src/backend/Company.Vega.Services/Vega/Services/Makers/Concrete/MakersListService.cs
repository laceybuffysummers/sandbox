namespace Company.Vega.Services.Vega.Services.Makers.Concrete
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Services.Lists;
    using Company.Vega.Domain.Entities;

    public sealed class MakersListService
        : IntIdNoRequestListService<MakerEntity>, IMakersListService
    {
        public MakersListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}