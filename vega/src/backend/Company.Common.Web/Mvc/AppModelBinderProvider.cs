namespace Company.Common.Web.Mvc
{
    using Company.Common.DataAnnotations.Extensions;

    using Microsoft.AspNetCore.Mvc.ModelBinding;

    public sealed class AppModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            var modelType = context.Metadata.ModelType;
            if (modelType.IsPrimitiveGeneric())
                return new CommaSeparatedModelBinder();

            return null;
        }
    }
}