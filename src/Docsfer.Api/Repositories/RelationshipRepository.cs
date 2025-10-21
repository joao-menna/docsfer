using Docsfer.Core.Extensions;
using Docsfer.Core.Relationships;
using Docsfer.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Docsfer.Api.Repositories;

public class RelationshipRepository(
    DocsferDbContext context,
    IGroupRepository groupRepository) : IRelationshipRepository
{
    public async Task<Relationship?> FindAsync(Guid from, Guid to)
    {
        return await context.Relationships.SingleOrDefaultAsync(b =>
            (b.PartyOneId == from && b.PartyTwoId == to) ||
            (b.PartyOneId == to && b.PartyTwoId == from));
    }

    public async Task<Relationship?> FindByIdAsync(Guid id)
    {
        return await context.Relationships.SingleOrDefaultAsync(b => b.Id == id);
    }

    public async Task<UsersAndGroups> GetUsersAndGroupsFromRelationship(Relationship relationship)
    {
        var result = new UsersAndGroups();

        // Party One
        if (relationship.PartyOneType == PartyType.User)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Id == relationship.PartyOneId);

            if (user != null)
                result.Users.Add(user);
        }
        else if (relationship.PartyOneType == PartyType.Group)
        {
            var group = await context.Groups
                .FirstOrDefaultAsync(g => g.Id == relationship.PartyOneId);

            if (group != null)
                result.Groups.Add(group);
        }

        // Party Two
        if (relationship.PartyTwoType == PartyType.User)
        {
            var user = await context.Users
                .FirstOrDefaultAsync(u => u.Id == relationship.PartyTwoId);

            if (user != null)
                result.Users.Add(user);
        }
        else if (relationship.PartyTwoType == PartyType.Group)
        {
            var group = await context.Groups
                .FirstOrDefaultAsync(g => g.Id == relationship.PartyTwoId);

            if (group != null)
                result.Groups.Add(group);
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
            var group = (await groupRepository.FindByIdAsync(relationship.PartyOneId)).EnsureExists();

            if (group.Users.Any(u => u.Id == userId))
            {
                return true;
            }
        }

        if (relationship.PartyTwoType == PartyType.Group)
        {
            var group = (await groupRepository.FindByIdAsync(relationship.PartyTwoId)).EnsureExists();

            if (group.Users.Any(u => u.Id == userId))
            {
                return true;
            }
        }

        return false;
    }
}