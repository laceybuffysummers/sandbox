namespace Company.Common.Web.Controllers.Common
{
    using Microsoft.AspNetCore.Authorization;

    [Authorize]
    public abstract class AuthorizeApiController : ApiController
    {        
    }
}