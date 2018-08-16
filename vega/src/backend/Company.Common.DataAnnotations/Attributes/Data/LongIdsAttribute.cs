namespace Company.Common.DataAnnotations.Attributes.Data
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.Linq;

    public sealed class LongIdsAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return true;
            }

            return ((IEnumerable<long>)value).All(id => id > 0);
        }
    }
}