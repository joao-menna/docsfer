using Docsfer.Api.Repositories;
using Docsfer.Core.Relationships;
using Docsfer.Core.Shared.Relationships;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Docsfer.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/relationship")]
public class RelationshipController(
    IRelationshipRepository relationshipRepository) : ControllerBase
{
    [HttpGet]
    [Route("related")]
    public async Task<IActionResult> GetUserRelatedRelationships()
    {
        throw new NotImplementedException();
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