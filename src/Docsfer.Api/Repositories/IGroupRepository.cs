using Docsfer.Core.Groups;
using Docsfer.Core.Identity;

namespace Docsfer.Api.Repositories;

public interface IGroupRepository
{
    public Task<Group?> FindByIdAsync(Guid id);
    public Task AssociateAsync(User user, Guid groupId);
    public Task<Group> InsertAsync(Group group, User owner);
    public Task<IEnumerable<User>> GetUsersInGroupAsync(Guid groupId);
    public Task<bool> IsUserInGroupAsync(Guid userId, Guid groupId);
    public Task<IEnumerable<Group>> FindByUserIdAsync(Guid userId);
    public Task<IEnumerable<Group>> FindByUserAsync(User user);
}
