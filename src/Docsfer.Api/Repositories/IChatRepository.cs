using Docsfer.Core.Chat;

namespace Docsfer.Api.Repositories;

public interface IChatRepository
{
    Task InsertAsync(ChatMessage message);
    Task<IEnumerable<ChatMessage>> GetByBlobAsync(long blobEntryId);
}