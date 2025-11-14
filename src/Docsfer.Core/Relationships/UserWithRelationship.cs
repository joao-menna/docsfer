using Docsfer.Core.Identity;

namespace Docsfer.Core.Relationships;

public class UserWithRelationship
{
    public User? User { get; set; }
    public Guid? RelationshipId { get; set; }
}