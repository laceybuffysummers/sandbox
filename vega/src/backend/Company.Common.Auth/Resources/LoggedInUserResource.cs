namespace Company.Common.Auth.Resources
{
    using System.ComponentModel.DataAnnotations;

    public sealed class LoggedInUserResource
    {
        public LoggedInUserResource()
        {            
        }

        public LoggedInUserResource(
            string userName,
            string email,
            string token)
        {
            this.UserName = userName;
            this.Email = email;
            this.Token = token;
        }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Token { get; set; }
    }
}