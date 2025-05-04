using Docsfer.Core.Identity;

namespace Docsfer.Core.Groups;

public class Group
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public List<User> Users { get; } = [];
}