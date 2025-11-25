using Docsfer.Core.Extensions;
using Docsfer.Core.Groups;
using Docsfer.Core.Identity;
using Docsfer.Core.Relationships;
using Docsfer.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Docsfer.Api.Repositories;

public class GroupRepository(DocsferDbContext context) : IGroupRepository
{
    public async Task<Group?> FindByIdAsync(Guid id)
    {
        return await context.Groups.SingleOrDefaultAsync(g => g.Id == id);
    }

    public async Task AssociateAsync(User user, Guid groupId)
    {
        var group = (await context.Groups.SingleAsync(g => g.Id == groupId)).EnsureExists();

        await context.GroupUsers.AddAsync(new GroupUser
        {
            GroupId = group.Id,
            UserId = user.Id,
        });

        await context.SaveChangesAsync();
    }

    public async Task<Group> InsertAsync(Group group, User owner)
    {
        await context.Groups.AddAsync(group);
        await context.SaveChangesAsync();

        await AssociateAsync(owner, group.Id);

        return group;
    }

    public async Task<IEnumerable<Group>> FindByUserAsync(User user)
    {
        return await context.Groups
            .Where(g => g.Users.Any(u => u.Id == user.Id))
            .AsNoTracking()
            .ToListAsync();
    }
}
