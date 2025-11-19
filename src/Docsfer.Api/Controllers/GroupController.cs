using Docsfer.Api.Repositories;
using Docsfer.Core.Extensions;
using Docsfer.Core.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Docsfer.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/group")]
public class GroupController(
    IGroupRepository groupRepository,
    UserManager<User> userManager) : ControllerBase
{
    [HttpPost]
    [Route("associate")]
    public async Task<IActionResult> AssociateUser(Guid userId, Guid groupId)
    {
        var user = (await userManager.FindByIdAsync(userId.ToString())).EnsureExists();

        await groupRepository.AssociateAsync(user, groupId);

        return Ok();
    }
}