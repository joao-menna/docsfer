using Docsfer.Api.Repositories;
using Docsfer.Core.Extensions;
using Docsfer.Core.Identity;
using Docsfer.Core.Relationships;
using Docsfer.Core.Shared.Relationships;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Docsfer.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/relationship")]
public class RelationshipController(
    IRelationshipRepository relationshipRepository,
    UserManager<User> userManager) : ControllerBase
{
    [HttpGet]
    [Route("related")]
    public async Task<IActionResult> GetUserRelatedRelationships()
    {
        var user = (await userManager.GetUserAsync(User)).EnsureExists();

        var result = await relationshipRepository.GetAllUsersAndGroupsRelatedToUser(user);
        return Ok(result);
    }

    [HttpPost]
    [Route("")]
    public async Task<IActionResult> Post(PostRelationshipInput input)
    {
        var relationship = new Relationship
        {
            PartyOneId = input.PartyOne,
            PartyTwoId = input.PartyTwo,
        };

        await relationshipRepository.InsertAsync(relationship);

        return Ok(relationship);
    }
}