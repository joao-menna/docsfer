using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Docsfer.Core.Chat;

public class ChatMessage
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public long BlobEntryId { get; set; }
    public Guid UserId { get; set; }
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public bool IsSystemMessage { get; set; } = false;
}