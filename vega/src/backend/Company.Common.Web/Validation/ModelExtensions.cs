namespace Company.Common.Web.Extensions
{
    using System.Collections.Generic;

    using System.Linq;

    using Microsoft.AspNetCore.Mvc.ModelBinding;

    using ModelError = Models.ModelError;

    internal static class ModelExtensions
    {
        public static IEnumerable<ModelError> GetErrors(this ModelStateDictionary modelState)
        {
            return (from key in modelState.Keys
                    let value = modelState[key] where 
                    value.Errors.Any()
                    select new ModelError(key, value.AttemptedValue, 
                        value.Errors.Select(e => e.ErrorMessage)))
                        .ToList();
        }
    }
}