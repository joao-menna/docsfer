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
            Group = group,
            User = user,
        });
    }
}