namespace Company.Common.Auth.Services
{
    using System.Threading.Tasks;

    using Company.Common.Auth.Models;

    public interface IAuthService
    {
        Task<RegisterResult> Register(Register register);

        Task<LoginResult> Login(Login login);
    }
}