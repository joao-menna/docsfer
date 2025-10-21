
using System.Net.Mail;
using Ardalis.GuardClauses;
using Docsfer.Api.Repositories;
using Docsfer.Core.Relationships;

namespace Docsfer.Api.Managers;

public class EmailManager : IEmailManager
{
    private readonly IRelationshipRepository _relationshipRepository;
    private readonly IConfiguration _configuration;
    private readonly SmtpClient _smtpClient;
    private readonly bool _enabled;

    public EmailManager(IRelationshipRepository relationshipRepository, IConfiguration configuration, SmtpClient smtpClient)
    {
        _relationshipRepository = relationshipRepository;
        _configuration = configuration;
        _smtpClient = smtpClient;
        _enabled = _configuration["Smtp:Enabled"] == bool.TrueString;
    }

    public async Task SendAsync(string subject, string htmlMessage, params string[] toEmails)
    {
        if (!_enabled) return;

        var fromEmail = _configuration["Smtp:EmailAddress"];
        Guard.Against.NullOrWhiteSpace(fromEmail);

        var mailMessage = new MailMessage
        {
            From = new MailAddress(fromEmail),
            Subject = subject,
            Body = htmlMessage,
            IsBodyHtml = true,
        };

        foreach (var email in toEmails)
        {
            mailMessage.To.Add(email);
        }

        await _smtpClient.SendMailAsync(mailMessage);
    }

    public async Task SendEmailForParties(Relationship relationship, string subject, string htmlMessage)
    {
        var usersAndGroups = await _relationshipRepository.GetUsersAndGroupsFromRelationship(relationship);

        if (usersAndGroups.Users.Count > 0)
        {
            var emails = usersAndGroups.Users.Where(u => u.Email is not null).Select(u => u.Email).ToArray();
            await SendAsync(subject, htmlMessage, emails!);
        }

        foreach (var group in usersAndGroups.Groups)
        {
            var emails = group.Users.Where(u => u.Email is not null).Select(u => u.Email).ToArray();
            await SendAsync(subject, htmlMessage, emails!);
        }
    }
}