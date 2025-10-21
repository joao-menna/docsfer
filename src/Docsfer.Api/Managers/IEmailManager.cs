using Docsfer.Core.Relationships;

namespace Docsfer.Api.Managers;

public interface IEmailManager
{
    public Task SendAsync(string subject, string htmlMessage, params string[] toEmails);
    public Task SendEmailForParties(Relationship relationship, string subject, string htmlMessage);
}