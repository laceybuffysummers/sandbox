namespace Company.Common.Auth.Models
{
    using System.ComponentModel.DataAnnotations;

    public sealed class Login
    {
        public Login(
            string userName,
            string password)
        {
            this.UserName = userName;
            this.Password = password;
        }

        [Required]
        public string UserName { get; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; }
    }
}