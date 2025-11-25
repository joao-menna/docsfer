using Docsfer.Core.Groups;
using Docsfer.Core.Identity;

namespace Docsfer.Api.Repositories;

public interface IGroupRepository
{
    public Task<Group?> FindByIdAsync(Guid id);
    public Task AssociateAsync(User user, Guid groupId);
    public Task<Group> InsertAsync(Group group, User owner);
    public Task<IEnumerable<Group>> FindByUserAsync(User user);
}
