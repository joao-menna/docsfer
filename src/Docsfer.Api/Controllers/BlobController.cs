using Ardalis.GuardClauses;
using Azure.Storage.Blobs;
using Docsfer.Api.Extensions;
using Docsfer.Api.Managers;
using Docsfer.Api.Repositories;
using Docsfer.Core.Blobs;
using Docsfer.Core.Exceptions.Blobs;
using Docsfer.Core.Extensions;
using Docsfer.Core.Identity;
using Docsfer.Core.Consts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Docsfer.Api.Controllers;

[Authorize]
[ApiController]
[Route("api/v1/blob")]
public class BlobController : ControllerBase
{
    private readonly BlobContainerClient _blobContainerClient;
    private readonly IRelationshipRepository _relationshipRepository;
    private readonly IBlobEntryRepository _blobEntryRepository;
    private readonly UserManager<User> _userManager;
    private readonly IEmailManager _emailManager;

    public BlobController(
        IConfiguration configuration,
        IRelationshipRepository relationshipRepository,
        IBlobEntryRepository blobEntryRepository,
        UserManager<User> userManager,
        IEmailManager emailManager)
    {
        var connectionString = configuration["AzureBlobStorage:ConnectionString"];
        var containerName = configuration["AzureBlobStorage:ContainerName"];

        var blobServiceClient = new BlobServiceClient(connectionString);
        _blobContainerClient = blobServiceClient.GetBlobContainerClient(containerName);
        _blobContainerClient.CreateIfNotExists();

        _relationshipRepository = relationshipRepository;
        _blobEntryRepository = blobEntryRepository;
        _userManager = userManager;
        _emailManager = emailManager;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] Guid relationshipId)
    {
        var relationship = (await _relationshipRepository.FindByIdAsync(relationshipId)).EnsureExists();

        var blobs = await _blobEntryRepository.GetAllInRelationAsync(relationship);

        return Ok(blobs);
    }

    [HttpGet("one")]
    public async Task<IActionResult> GetOne(
    [FromQuery] Guid relationshipId,
    [FromQuery] long blobEntryId)
    {
        var relationship = (await _relationshipRepository.FindByIdAsync(relationshipId)).EnsureExists();

        var blob = await _blobEntryRepository.FindByIdAsync(blobEntryId);

        if (blob == null || blob.RelationshipId != relationship.Id)
        {
            return NotFound("Blob entry not found for this relationship.");
        }

        return Ok(blob);
    }

    [HttpGet]
    [Route("path")]
    public async Task<IActionResult> Path(
        [FromQuery] Guid relationshipId,
        [FromQuery] string blobEntryFileName,
        [FromQuery] int version)
    {
        var relationship = (await _relationshipRepository.FindByIdAsync(relationshipId)).EnsureExists();
        var blobEntry = (await _blobEntryRepository.GetBlobByFileName(relationship, blobEntryFileName)).EnsureExists();

        if (version < 1)
        {
            version = blobEntry.CurrentVersion;
        }

        var path = $"{relationship.Id}/{blobEntry.BlobName}.v{version}.file";

        return Ok(new
        {
            path
        });
    }

    [HttpPost("upload")]
    public async Task<IActionResult> Upload(
        [FromForm] IFormFile file,
        [FromForm] Guid from,
        [FromForm] Guid to)
    {
        if (file is null || file.Length == 0)
        {
            throw new InvalidFileException();
        }

        using var stream = file.OpenReadStream();

        var relationship = (await _relationshipRepository.FindAsync(from, to)).EnsureExists();

        var blobEntry = await _blobEntryRepository.GetBlobByFileName(relationship, file.FileName);

        if (blobEntry is null)
        {
            blobEntry = new BlobEntry
            {
                FileName = file.FileName,
                Relationship = relationship,
                CurrentVersion = 1,
            };

            await _blobEntryRepository.InsertAsync(blobEntry);
        }
        else
        {
            blobEntry.CurrentVersion += 1;
            await _blobEntryRepository.UpdateAsync(blobEntry);
        }

        var path = $"{relationship.Id}/{blobEntry.BlobName}.v{blobEntry.CurrentVersion}.file";
        var blobClient = _blobContainerClient.GetBlobClient(path);

        await blobClient.UploadAsync(stream);

        await _emailManager.SendEmailForParties(
            relationship,
            subject: DocsferConsts.AssuntoEmailNovoArquivo,
            htmlMessage: string.Format(DocsferConsts.MensagemEmailNovoArquivo, file.FileName)
        );

        return Ok(new
        {
            path,
        });
    }

    [HttpGet("download")]
    public async Task<IActionResult> Download([FromQuery] string path)
    {
        Guard.Against.NullOrWhiteSpace(path);

        var relationshipIdStr = path.Split("/")[0];
        var relationshipId = Guid.Parse(relationshipIdStr);

        var user = (await _userManager.GetUserAsync(User)).EnsureExists();
        var relationship = (await _relationshipRepository.FindByIdAsync(relationshipId)).EnsureExists();

        var isUserRelatedToBlob = await _relationshipRepository.IsUserRelatedToRelationship(
            user.Id, relationship);

        if (!isUserRelatedToBlob)
        {
            throw new UserNotRelatedToBlobException();
        }

        var blobClient = _blobContainerClient.GetBlobClient(path);

        var blob = await blobClient.DownloadContentAsync();

        return File(blob.Value.Content.ToStream(), "application/octet-stream");
    }
}
