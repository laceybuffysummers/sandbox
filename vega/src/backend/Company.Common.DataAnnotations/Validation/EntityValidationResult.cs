using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;

namespace Microsoft.Azure.Analytics.Common.Validation
{
    public sealed class EntityValidationResult
    {
        public EntityValidationResult(IList<ValidationResult> results)
        {
            this.Results = results ?? new List<ValidationResult>();
        }

        public IList<ValidationResult> Results { get; private set; }

        public bool HasErrors
        {
            get { return this.Results.Any(r => r != ValidationResult.Success); }
        }

        public static EntityValidationResult CreateSuccessResult()
        {
            return new EntityValidationResult(null);
        }

        public override string ToString()
        {
            var sb = new StringBuilder();

            foreach (var error in this.Results.Where(r => r != ValidationResult.Success))
            {
                sb.AppendLine(error.ErrorMessage);
            }

            return sb.ToString();
        }
    }
}