namespace Company.Vega.Services.Vega.Services.Owners.Concrete
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Models.Lists;
    using Company.Common.Services.Services.Lists;
    using Company.Vega.Domain.Entities;
    using Company.Vega.Services.Vega.Services.Owners;

    public sealed class OwnersListService
        : PersonsListService<OwnerEntity, int, EmptyListRequest>, IOwnersListService
    {
        public OwnersListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}