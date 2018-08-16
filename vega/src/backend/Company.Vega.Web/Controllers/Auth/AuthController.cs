namespace Company.Vega.Web.Controllers.Auth
{
    using AutoMapper;

    using Company.Common.Auth.Services;

    public sealed class AuthController : Company.Common.Auth.Controllers.AuthController
    {
        public AuthController(IAuthService authService, IMapper mapper)
            : base(authService, mapper)
        {
        }
    }
}