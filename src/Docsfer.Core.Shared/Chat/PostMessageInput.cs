using System.ComponentModel.DataAnnotations;

namespace Docsfer.Core.Shared.Chat;

public class PostMessageInput
{
    [Required]
    [StringLength(1000)]
    public string Content { get; set; } = string.Empty;
}