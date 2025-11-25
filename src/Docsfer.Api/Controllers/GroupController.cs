using Docsfer.Api.Repositories;
using Docsfer.Core.Extensions;
using Docsfer.Core.Groups;
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
    [HttpGet]
    [Route("")]
    public async Task<IActionResult> GetAllForUser()
    {
        var user = (await userManager.GetUserAsync(User)).EnsureExists();

        var groups = await groupRepository.FindByUserAsync(user);

        return Ok(groups.Select(g => new GroupSummary(g.Id, g.Name)));
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> Create([FromBody] CreateGroupInput input)
    {
        var user = (await userManager.GetUserAsync(User)).EnsureExists();

        var group = await groupRepository.InsertAsync(new Group { Name = input.Name }, user);

        return Ok(new
        {
            id = group.Id,
            name = group.Name,
        });
    }

    [HttpPost]
    [Route("associate")]
    public async Task<IActionResult> AssociateUser(Guid userId, Guid groupId)
    {
        var user = (await userManager.FindByIdAsync(userId.ToString())).EnsureExists();

        await groupRepository.AssociateAsync(user, groupId);

        return Ok();
    }
}

public record CreateGroupInput(string Name);
public record GroupSummary(Guid Id, string Name);
