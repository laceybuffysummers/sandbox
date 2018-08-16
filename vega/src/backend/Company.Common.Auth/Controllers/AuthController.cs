namespace Company.Common.Auth.Controllers
{
    using System.Linq;
    using System.Threading.Tasks;

    using AutoMapper;

    using Company.Common.Auth.Models;
    using Company.Common.Auth.Resources;
    using Company.Common.Auth.Services;

    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;

    [AllowAnonymous]
    [Route("api/v1/[controller]/[action]")]
    public abstract class AuthController : Controller
    {
        private readonly IAuthService authService;

        protected readonly IMapper Mapper;

        protected AuthController(
            IAuthService authService, 
            IMapper mapper)
        {
            this.authService = authService;
            this.Mapper = mapper;
        }

        [HttpPost]
        public virtual async Task<IActionResult> Register([FromBody] RegisterResource registerResource)
        {
            var register = this.Mapper.Map<Register>(registerResource);
            var result = await this.authService.Register(register);
            var resultResource = this.Mapper.Map<RegisterResultResource>(result);

            if (resultResource.Errors.Any())
            {
                return this.BadRequest(resultResource.Errors);
            }

            return this.Ok(resultResource.User);
        }

        [HttpPost]
        public virtual async Task<IActionResult> Login([FromBody] LoginResource loginResource)
        {
            var login = this.Mapper.Map<Login>(loginResource);
            var result = await this.authService.Login(login);
            var resultResource = this.Mapper.Map<LoginResultResource>(result);

            if (!resultResource.Succeeded)
            {
                return this.BadRequest();
            }

            return this.Ok(resultResource.User);
        }
    }
}