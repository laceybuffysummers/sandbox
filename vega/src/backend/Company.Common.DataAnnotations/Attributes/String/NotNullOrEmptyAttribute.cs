namespace Company.Common.DataAnnotations.Attributes.String
{
    using System.ComponentModel.DataAnnotations;
    public sealed class NotNullOrEmptyAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return !string.IsNullOrEmpty((string)value);
        }
    }
}