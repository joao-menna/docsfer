using Docsfer.Core.Groups;
using Docsfer.Core.Identity;

namespace Docsfer.Core.Relationships;

public class UsersAndGroups
{
    public ICollection<User> Users { get; set; } = [];
    public ICollection<Group> Groups { get; set; } = [];
}