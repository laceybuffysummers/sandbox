namespace Company.Common.Auth.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class LoggedInUser
    {
        public LoggedInUser(
            string userName, 
            string email,
            string token)
        {
            this.UserName = userName;
            this.Email = email;
            this.Token = token;
        }

        [Required]
        public string UserName { get; }

        [Required]
        [EmailAddress]
        public string Email { get; }

        [Required]
        public string Token { get; }
    }
}