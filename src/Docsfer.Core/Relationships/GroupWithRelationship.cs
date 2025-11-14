using Docsfer.Core.Groups;

namespace Docsfer.Core.Relationships;

public class GroupWithRelationship
{
    public Group? Group { get; set; }
    public Guid? RelationshipId { get; set; }
}