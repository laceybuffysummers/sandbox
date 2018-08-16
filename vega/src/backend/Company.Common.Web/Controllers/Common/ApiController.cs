namespace Company.Common.Web.Controllers.Common
{
    using Company.Common.Web.Constants;

    using Microsoft.AspNetCore.Mvc;

    [Route(Routes.ApiRoute + "[controller]")]
    public abstract class ApiController : Controller
    {        
    }
}