namespace Company.Common.DataAnnotations.Attributes.Data
{
    using System.ComponentModel.DataAnnotations;

    public sealed class LongIdAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return true;
            }

            return (long)value > 0;
        }
    }
}