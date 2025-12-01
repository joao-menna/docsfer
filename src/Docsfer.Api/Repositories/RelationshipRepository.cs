using Docsfer.Core.Extensions;
using Docsfer.Core.Groups;
using Docsfer.Core.Identity;
using Docsfer.Core.Relationships;
using Docsfer.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Docsfer.Api.Repositories;

public class RelationshipRepository(
    DocsferDbContext context,
    IGroupRepository groupRepository,
    UserManager<User> userManager) : IRelationshipRepository
{
    public async Task<Relationship?> FindAsync(Guid from, Guid to)
    {
        return await context.Relationships.SingleOrDefaultAsync(b =>
            (b.PartyOneId == from && b.PartyTwoId == to) ||
            (b.PartyOneId == to && b.PartyTwoId == from));
    }

    public async Task<UsersAndGroups> FindAsync(Guid from)
    {
        var user = (await userManager.FindByIdAsync(from.ToString())).EnsureExists();

        var directRelations = await context.Relationships
            .Where(b => b.PartyOneId == from || b.PartyTwoId == from)
            .ToListAsync();

        var result = new UsersAndGroups();

        foreach (var rel in directRelations)
        {
            if (rel.PartyOneId != from)
            {
                if (rel.PartyOneType == PartyType.User)
                {
                    var relatedUser = await context.Users.FirstOrDefaultAsync(u => u.Id == rel.PartyOneId);
                    if (relatedUser != null)
                        result.Users.Add(new UserWithRelationship
                        {
                            User = relatedUser,
                            RelationshipId = rel.Id
                        });
                }
                else if (rel.PartyOneType == PartyType.Group)
                {
                    var relatedGroup = await context.Groups.FirstOrDefaultAsync(g => g.Id == rel.PartyOneId);
                    if (relatedGroup != null)
                        result.Groups.Add(new GroupWithRelationship
                        {
                            Group = relatedGroup,
                            RelationshipId = rel.Id
                        });
                }
            }

            if (rel.PartyTwoId != from)
            {
                if (rel.PartyTwoType == PartyType.User)
                {
                    var relatedUser = await context.Users.FirstOrDefaultAsync(u => u.Id == rel.PartyTwoId);
                    if (relatedUser != null)
                        result.Users.Add(new UserWithRelationship
                        {
                            User = relatedUser,
                            RelationshipId = rel.Id
                        });
                }
                else if (rel.PartyTwoType == PartyType.Group)
                {
                    var relatedGroup = await context.Groups.FirstOrDefaultAsync(g => g.Id == rel.PartyTwoId);
                    if (relatedGroup != null)
                        result.Groups.Add(new GroupWithRelationship
                        {
                            Group = relatedGroup,
                            RelationshipId = rel.Id
                        });
                }
            }
        }

        var userGroups = await groupRepository.FindByUserIdAsync(user.Id);
        if (userGroups != null)
        {
            foreach (var grp in userGroups)
            {
                result.Groups.Add(new GroupWithRelationship
                {
                    Group = grp,
                    RelationshipId = Guid.Empty
                });
            }
        }

        result.Users = [.. result.Users
            .GroupBy(u => u.User?.Id)
            .Select(g => g.First())];

        result.Groups = [.. result.Groups
            .GroupBy(g => g.Group?.Id)
            .Select(g => g.First())];

        return result;
    }


    public async Task<Relationship?> FindByIdAsync(Guid id)
    {
        return await context.Relationships.SingleOrDefaultAsync(b => b.Id == id);
    }

    public async Task<UsersAndGroups> GetAllUsersAndGroupsRelatedToUser(User user)
    {
        var related = await FindAsync(user.Id);
        return related;
    }

    public async Task<UsersAndGroups> GetUsersAndGroupsFromRelationship(Relationship relationship)
    {
        var result = new UsersAndGroups();

        if (relationship.PartyOneType == PartyType.User)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Id == relationship.PartyOneId);

            if (user != null)
                result.Users.Add(new UserWithRelationship
                {
                    User = user,
                    RelationshipId = relationship.Id
                });
        }
        else if (relationship.PartyOneType == PartyType.Group)
        {
            var group = await context.Groups
                .FirstOrDefaultAsync(g => g.Id == relationship.PartyOneId);

            if (group != null)
                result.Groups.Add(new GroupWithRelationship
                {
                    Group = group,
                    RelationshipId = relationship.Id
                });
        }

        if (relationship.PartyTwoType == PartyType.User)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Id == relationship.PartyTwoId);

            if (user != null)
                result.Users.Add(new UserWithRelationship
                {
                    User = user,
                    RelationshipId = relationship.Id
                });
        }
        else if (relationship.PartyTwoType == PartyType.Group)
        {
            var group = await context.Groups
                .FirstOrDefaultAsync(g => g.Id == relationship.PartyTwoId);

            if (group != null)
                result.Groups.Add(new GroupWithRelationship
                {
                    Group = group,
                    RelationshipId = relationship.Id
                });
        }

        return result;
    }


    public async Task InsertAsync(Relationship relationship)
    {
        await context.Relationships.AddAsync(relationship);
        await context.SaveChangesAsync();
    }

    public async Task<bool> IsUserRelatedToRelationship(Guid userId, Relationship relationship)
    {
        if (relationship.PartyOneType == PartyType.User && relationship.PartyOneId == userId)
        {
            return true;
        }

        if (relationship.PartyTwoType == PartyType.User && relationship.PartyTwoId == userId)
        {
            return true;
        }

        if (relationship.PartyOneType == PartyType.Group)
        {
            var isMember = await context.GroupUsers.AnyAsync(gu =>
                gu.GroupId == relationship.PartyOneId &&
                gu.UserId == userId);

            if (isMember)
            {
                return true;
            }
        }

        if (relationship.PartyTwoType == PartyType.Group)
        {
            var isMember = await context.GroupUsers.AnyAsync(gu =>
                gu.GroupId == relationship.PartyTwoId &&
                gu.UserId == userId);

            if (isMember)
            {
                return true;
            }
        }

        return false;
    }
}
