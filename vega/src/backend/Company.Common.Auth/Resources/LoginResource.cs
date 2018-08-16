namespace Company.Common.Auth.Resources
{
    using System.ComponentModel.DataAnnotations;

    public sealed class LoginResource
    {
        public LoginResource()
        {            
        }

        public LoginResource(
            string userName,
            string password)
        {
            this.UserName = userName;
            this.Password = password;
        }

        [Required]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}