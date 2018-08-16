namespace Company.Common.Auth.Resources
{
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity;

    public sealed class RegisterResultResource
    {
        public RegisterResultResource()
        {            
        }

        public RegisterResultResource(
            LoggedInUserResource user,
            IEnumerable<IdentityError> errors)
        {
            this.User = user;
            this.Errors = errors;
        }

        public LoggedInUserResource User { get; set; }

        public IEnumerable<IdentityError> Errors { get; set; }
    }
}