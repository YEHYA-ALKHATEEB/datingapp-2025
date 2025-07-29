using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Base API controller that can be extended by other controllers
    // It can contain common logic or properties for all API controllers
[Route("api/[controller]")]
[ApiController]

public class BaseApiController : ControllerBase
{
    // Base controller logic can go here
}
}