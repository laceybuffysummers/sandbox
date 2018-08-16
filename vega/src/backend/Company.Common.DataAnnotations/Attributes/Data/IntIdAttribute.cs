namespace Company.Common.DataAnnotations.Attributes.Data
{
    using System.ComponentModel.DataAnnotations;

    public sealed class IntIdAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null)
            {
                return true;
            }

            return (int)value > 0;
        }
    }
}