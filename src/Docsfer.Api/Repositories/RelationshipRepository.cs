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

        // Busca todos os relacionamentos onde o usuário aparece
        var directRelations = await context.Relationships
            .Where(b => b.PartyOneId == from || b.PartyTwoId == from)
            .ToListAsync();

        var users = new List<User>();
        var groups = new List<Group>();

        foreach (var rel in directRelations)
        {
            if (rel.PartyOneType == PartyType.User && rel.PartyOneId != from)
            {
                var relatedUser = await context.Users.FirstOrDefaultAsync(u => u.Id == rel.PartyOneId);
                if (relatedUser != null)
                    users.Add(relatedUser);
            }
            else if (rel.PartyOneType == PartyType.Group && rel.PartyOneId != from)
            {
                var relatedGroup = await context.Groups.FirstOrDefaultAsync(g => g.Id == rel.PartyOneId);
                if (relatedGroup != null)
                    groups.Add(relatedGroup);
            }

            if (rel.PartyTwoType == PartyType.User && rel.PartyTwoId != from)
            {
                var relatedUser = await context.Users.FirstOrDefaultAsync(u => u.Id == rel.PartyTwoId);
                if (relatedUser != null)
                    users.Add(relatedUser);
            }
            else if (rel.PartyTwoType == PartyType.Group && rel.PartyTwoId != from)
            {
                var relatedGroup = await context.Groups.FirstOrDefaultAsync(g => g.Id == rel.PartyTwoId);
                if (relatedGroup != null)
                    groups.Add(relatedGroup);
            }
        }

        if (user.Groups != null && user.Groups.Count != 0)
            groups.AddRange(user.Groups);

        return new UsersAndGroups
        {
            Users = [.. users.DistinctBy(u => u.Id)],
            Groups = [.. groups.DistinctBy(g => g.Id)]
        };
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