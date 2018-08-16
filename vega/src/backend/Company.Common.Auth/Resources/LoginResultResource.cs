namespace Company.Common.Auth.Resources
{
    public sealed class LoginResultResource
    {
        public LoginResultResource()
        {            
        }

        public LoginResultResource(
            bool succeeded,
            LoggedInUserResource user)
        {
            this.Succeeded = succeeded;
            this.User = user;
        }

        public bool Succeeded { get; set; }

        public LoggedInUserResource User { get; set; }
    }
}