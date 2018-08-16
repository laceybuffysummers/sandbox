namespace Company.Vega.Services.Vega.Services.Features.Concrete
{
    using Company.Common.Dal.Infrastructure;
    using Company.Common.Services.Services.Lists;
    using Company.Vega.Domain.Entities;

    public sealed class FeaturesListService
        : IntIdNoRequestListService<FeatureEntity>, IFeaturesListService
    {
        public FeaturesListService(IUnitOfWorkFactory unitOfWorkFactory)
            : base(unitOfWorkFactory)
        {
        }
    }
}