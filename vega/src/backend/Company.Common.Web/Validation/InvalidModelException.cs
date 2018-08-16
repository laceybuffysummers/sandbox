namespace Company.Common.Web.Models
{
    using System;
    using System.Collections.Generic;
    using System.Text;

    public sealed class InvalidModelException : Exception
    {
        private string message;

        public InvalidModelException(IEnumerable<ModelError> errors)
        {
            this.Errors = errors;
        }

        public IEnumerable<ModelError> Errors { get; }
        

        public override string Message
        {
            get
            {
                if (string.IsNullOrEmpty(this.message))
                {
                    var sb = new StringBuilder();
                    foreach (var error in this.Errors)
                    {
                        sb.AppendLine(error.ToString());
                    }

                    this.message = sb.ToString();
                }

                return this.message;
            }
        }
    }
}