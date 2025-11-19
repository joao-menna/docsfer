using Docsfer.Core.Groups;
using Docsfer.Core.Identity;

namespace Docsfer.Api.Repositories;

public interface IGroupRepository
{
    public Task<Group?> FindByIdAsync(Guid id);
    public Task AssociateAsync(User user, Guid groupId);
}