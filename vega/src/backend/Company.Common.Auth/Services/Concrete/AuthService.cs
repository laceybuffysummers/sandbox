namespace Company.Common.Auth.Services.Concrete
{
    using System.Threading.Tasks;

    using AutoMapper;

    using Company.Common.Auth.Models;

    using Microsoft.AspNetCore.Identity;

    public class AuthService : IAuthService
    {
        protected readonly UserManager<IdentityUser> UserManager;
        protected readonly SignInManager<IdentityUser> SignInManager;
        protected readonly IMapper Mapper;

        public AuthService(
            UserManager<IdentityUser> userManager, 
            SignInManager<IdentityUser> signInManager,
            IMapper mapper)
        {
            this.UserManager = userManager;
            this.SignInManager = signInManager;
            this.Mapper = mapper;
        }

        public virtual async Task<RegisterResult> Register(Register register)
        {
            var user = new IdentityUser
                           {
                               UserName = register.UserName,
                               Email = register.Email
                           };

            var result = await this.UserManager.CreateAsync(user, register.Password);
            if (!result.Succeeded)
            {
                return new RegisterResult(null, result.Errors);
            }

            await this.SignInManager.SignInAsync(user, false);
            return new RegisterResult(this.Mapper.Map<LoggedInUser>(user), new IdentityError[0]);
        }

        public virtual async Task<LoginResult> Login(Login login)
        {
            var result = await this.SignInManager.PasswordSignInAsync(
                                                    login.UserName, 
                                                    login.Password, 
                                                    false, 
                                                    false);
            if (!result.Succeeded)
            {
                return new LoginResult(false, null);
            }

            var user = await this.UserManager.FindByNameAsync(login.UserName);
            return new LoginResult(true, this.Mapper.Map<LoggedInUser>(user));
        } 
    }
}