namespace Docsfer.Core.Relationships;

public class UsersAndGroups
{
    public ICollection<UserWithRelationship> Users { get; set; } = [];
    public ICollection<GroupWithRelationship> Groups { get; set; } = [];
}