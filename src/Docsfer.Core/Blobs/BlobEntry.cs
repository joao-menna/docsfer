using System.Text.Json.Serialization;
using Docsfer.Core.Relationships;

namespace Docsfer.Core.Blobs;

public class BlobEntry
{
    public long? Id { get; set; } = null;

    public Guid? RelationshipId { get; set; }

    [JsonIgnore]
    public Relationship? Relationship { get; set; }

    public string BlobName { get; set; } = Guid.NewGuid().ToString();

    public string FileName { get; set; } = string.Empty;

    public int CurrentVersion { get; set; } = 1;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}