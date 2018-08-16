namespace Company.Common.Auth.Resources
{
    using System.ComponentModel.DataAnnotations;

    public sealed class RegisterResource
    {
        public RegisterResource()
        {            
        }

        public RegisterResource(
            string userName,
            string email,
            string password)
        {
            this.UserName = userName; 
            this.Email = email;
            this.Password = password;
        }

        [Required]
        public string UserName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; }
    }
}