using Docsfer.Api.Repositories;
using Docsfer.Core.Extensions;
using Docsfer.Core.Groups;
using Docsfer.Core.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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

    [HttpGet]
    [Route("{groupId:guid}/users")]
    public async Task<IActionResult> GetUsersInGroup(Guid groupId)
    {
        var user = (await userManager.GetUserAsync(User)).EnsureExists();

        var isMember = await groupRepository.IsUserInGroupAsync(user.Id, groupId);
        if (!isMember)
        {
            return Forbid();
        }

        var users = await groupRepository.GetUsersInGroupAsync(groupId);
        return Ok(users.Select(u => new UserSummary(u.Id, u.UserName ?? string.Empty, u.Email ?? string.Empty)));
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
        try
        {
            var user = (await userManager.FindByIdAsync(userId.ToString())).EnsureExists();
            await groupRepository.AssociateAsync(user, groupId);
            return Ok();
        }
        catch (DbUpdateException)
        {
            return Ok();
        }
    }
}

public record CreateGroupInput(string Name);
public record GroupSummary(Guid Id, string Name);
public record UserSummary(Guid Id, string Username, string Email);
