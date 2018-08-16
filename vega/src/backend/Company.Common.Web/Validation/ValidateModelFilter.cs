namespace Company.Common.Web.Validation
{
    using Company.Common.Web.Extensions;
    using Company.Common.Web.Models;

    using Microsoft.AspNetCore.Mvc.Filters;

    public sealed class ValidateModelFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {
            var modelState = context.ModelState;
            if (!modelState.IsValid)
            {
                throw new InvalidModelException(modelState.GetErrors());
            }

            base.OnActionExecuting(context);
        }
    }
}