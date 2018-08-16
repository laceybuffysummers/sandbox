namespace Company.Common.DataAnnotations.Attributes.Common
{
    using System.ComponentModel.DataAnnotations;
    public sealed class InvalidAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            return false;
        }
    }
}