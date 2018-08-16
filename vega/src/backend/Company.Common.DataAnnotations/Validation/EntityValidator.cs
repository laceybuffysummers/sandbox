namespace Company.Common.DataAnnotations.Validation
{
    using System.Collections;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    using Company.Common.DataAnnotations.Extensions;

    using Microsoft.Azure.Analytics.Common.Validation;

    public static class EntityValidator
    {
        public static EntityValidationResult Validate(object entity)
        {
            return Validate(entity, null);
        }

        public static EntityValidationResult Validate(object entity, IDictionary<object, object> items)
        {
            var validationResults = new List<ValidationResult>();
            TryValidateObjectRecursive(entity, validationResults, items);

            return new EntityValidationResult(validationResults);
        }

        private static bool TryValidateObjectRecursive(object entity, ICollection<ValidationResult> results,
            IDictionary<object, object> items)
        {
            var context = new ValidationContext(entity, null, items);
            var result = Validator.TryValidateObject(entity, context, results, true);

            var properties = entity.GetType().GetProperties().Where(prop => prop.CanRead).ToList();

            foreach (var property in properties)
            {
                if (property.PropertyType.IsPrimitive())
                {
                    continue;
                }

                var value = property.GetValue(entity);

                if (value == null)
                {
                    continue;
                }

                var collection = value as IEnumerable;
                if (collection != null)
                {
                    foreach (var element in collection)
                    {
                        result = TryValidateObjectRecursive(element, results, items) && result;
                    }
                }
                else
                {
                    result = TryValidateObjectRecursive(value, results, items) && result;
                }
            }

            return result;
        }
    }
}