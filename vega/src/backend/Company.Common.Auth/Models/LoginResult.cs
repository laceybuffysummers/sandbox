namespace Company.Common.Auth.Models
{
    public sealed class LoginResult
    {
        public LoginResult(
            bool succeeded,
            LoggedInUser user)
        {
            this.Succeeded = succeeded;
            this.User = user;
        }

        public bool Succeeded { get; }

        public LoggedInUser User { get; }
    }
}