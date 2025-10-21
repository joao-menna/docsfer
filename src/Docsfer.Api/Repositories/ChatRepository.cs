using Docsfer.Core.Chat;
using Docsfer.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Docsfer.Api.Repositories;

public class ChatRepository(DocsferDbContext context) : IChatRepository
{
    public async Task InsertAsync(ChatMessage message)
    {
        await context.ChatMessages.AddAsync(message);
        await context.SaveChangesAsync();
    }

    public async Task<IEnumerable<ChatMessage>> GetByBlobAsync(long blobEntryId)
    {
        return await context.ChatMessages
            .Where(m => m.BlobEntryId == blobEntryId)
            .OrderBy(m => m.CreatedAt)
            .ToListAsync();
    }
}