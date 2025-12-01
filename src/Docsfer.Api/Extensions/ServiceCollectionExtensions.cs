using Docsfer.Api.Managers;
using System.Net.Mail;

namespace Docsfer.Api.Extensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddEmailServices(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddScoped<SmtpClient>(provider =>
            {
                var host = configuration["Smtp:Hostname"] ?? "localhost";
                var port = int.TryParse(configuration["Smtp:Port"], out var p) ? p : 25;
                return new SmtpClient(host, port);
            });

            services.AddScoped<IEmailManager, EmailManager>();

            return services;
        }
    }
}
