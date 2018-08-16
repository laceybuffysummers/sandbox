namespace Company.Common.Web.Models
{
    using System.Collections.Generic;

    public sealed class ModelError
    {
        public ModelError(
               string field,
               string value,
               IEnumerable<string> errors)
        {
            this.Errors = errors;
            this.Value = value;
            this.Field = field;
        }

        public string Field { get; }

        public string Value { get; }

        public IEnumerable<string> Errors { get; }

        public override string ToString()
        {
            return $"Field: {this.Field}; Value: {this.Value}; Errors: {string.Join("; ", this.Errors)};";
        }
    }
}