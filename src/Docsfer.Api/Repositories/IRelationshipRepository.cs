using Docsfer.Core.Identity;
using Docsfer.Core.Relationships;

namespace Docsfer.Api.Repositories;

public interface IRelationshipRepository
{
    public Task<Relationship?> FindAsync(Guid from, Guid to);
    public Task<UsersAndGroups> FindAsync(Guid from);
    public Task<Relationship?> FindByIdAsync(Guid id);
    public Task<UsersAndGroups> GetAllUsersAndGroupsRelatedToUser(User user);
    public Task InsertAsync(Relationship relationship);
    public Task<bool> IsUserRelatedToRelationship(Guid userId, Relationship relationship);
    public Task<UsersAndGroups> GetUsersAndGroupsFromRelationship(Relationship relationship);
}

