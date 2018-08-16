namespace Company.Common.Auth.Models
{
    using System.Collections.Generic;

    using Microsoft.AspNetCore.Identity;

    public sealed class RegisterResult
    {
        public RegisterResult(
            LoggedInUser user,
            IEnumerable<IdentityError> errors)
        {
            this.User = user;
            this.Errors = errors;
        }

        public LoggedInUser User { get; }

        public IEnumerable<IdentityError> Errors { get; }
    }
}