using Docsfer.Core.Blobs;

namespace Docsfer.Core.Relationships;

public class Relationship
{
    public Guid Id { get; set; } = Guid.Empty;

    public Guid PartyOneId { get; set; } = Guid.Empty;

    public Guid PartyTwoId { get; set; } = Guid.Empty;

    public PartyType PartyOneType { get; set; } = PartyType.User;

    public PartyType PartyTwoType { get; set; } = PartyType.User;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public List<BlobEntry> Blobs { get; } = [];
}
