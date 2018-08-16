namespace Company.Common.Web.Mvc
{
    using System;
    using System.Collections;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;
    using System.Threading.Tasks;

    using Company.Common.DataAnnotations.Extensions;

    using Microsoft.AspNetCore.Mvc.ModelBinding;

    public sealed class CommaSeparatedModelBinder : IModelBinder
    {
        private static readonly MethodInfo ToArrayMethod = typeof(Enumerable).GetMethod("ToArray");

        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            var type = bindingContext.ModelType;
            if (type.GetInterface(typeof(IEnumerable).Name) == null)
            {
                return Task.CompletedTask;
            }

            var valueType = type.GetGenericType();
            if (valueType == null || valueType.GetInterface(typeof(IConvertible).Name) == null)
            {
                return Task.CompletedTask;
            }

            var list = (IList)Activator.CreateInstance(typeof(List<>).MakeGenericType(valueType));
            var actualValue = bindingContext.ValueProvider.GetValue(bindingContext.ModelName).FirstValue;
            if (actualValue == null)
            {
                return Task.CompletedTask;
            }

            foreach (var splitValue in actualValue.Split(new[] { ',' }))
            {
                if (!string.IsNullOrWhiteSpace(splitValue))
                    list.Add(Convert.ChangeType(splitValue, valueType));
            }

            var result = type.IsArray ? ToArrayMethod.MakeGenericMethod(valueType).Invoke(this, new object[] { list }) : list;
            if (result != null)
            {
                bindingContext.Result = ModelBindingResult.Success(result);
            }

            return Task.CompletedTask;
        }
    }
}