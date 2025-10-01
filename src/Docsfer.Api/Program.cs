using Docsfer.Api.Extensions;
using Docsfer.Api.Middlewares;
using Docsfer.Api.Repositories;
using Docsfer.Core.Identity;
using Docsfer.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Connection String
var connectionString = builder.Configuration["ConnectionStrings:Default"];

// Authentication Providers
var jwtAuthority = builder.Configuration["Authentication:Jwt:Authority"];
var jwtAudience = builder.Configuration["Authentication:Jwt:Audience"];
var jwtIssuer = builder.Configuration["Authentication:Jwt:Issuer"];
var jwtKey = builder.Configuration["Authentication:Jwt:Key"];

var githubClientId = builder.Configuration["Authentication:GitHub:ClientId"];
var githubClientSecret = builder.Configuration["Authentication:GitHub:ClientSecret"];

var googleClientId = builder.Configuration["Authentication:Google:ClientId"];
var googleClientSecret = builder.Configuration["Authentication:Google:ClientSecret"];

var microsoftClientId = builder.Configuration["Authentication:Microsoft:ClientId"];
var microsoftClientSecret = builder.Configuration["Authentication:Microsoft:ClientSecret"];


// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi("v1");

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromDays(1);
        options.SlidingExpiration = true;
    });
// .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
// {
//     options.Authority = jwtAuthority;
//     options.Audience = jwtAudience;
// });

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
});

if (!string.IsNullOrWhiteSpace(githubClientId) && !string.IsNullOrWhiteSpace(githubClientSecret))
{
    builder.Services.AddAuthentication()
        .AddGitHub(options =>
        {
            options.CallbackPath = "/api/v1/auth/oauth/GitHub/callback";
            options.ClientId = githubClientId;
            options.ClientSecret = githubClientSecret;

            options.SignInScheme = IdentityConstants.ExternalScheme;
        });
}

if (!string.IsNullOrWhiteSpace(microsoftClientId) && !string.IsNullOrWhiteSpace(microsoftClientSecret))
{
    builder.Services.AddAuthentication()
        .AddMicrosoftAccount(options =>
        {
            options.CallbackPath = "/api/v1/auth/oauth/Microsoft/callback";
            options.ClientId = microsoftClientId;
            options.ClientSecret = microsoftClientSecret;

            options.SignInScheme = IdentityConstants.ExternalScheme;
        });
}

if (!string.IsNullOrWhiteSpace(googleClientId) && !string.IsNullOrWhiteSpace(googleClientSecret))
{
    builder.Services.AddAuthentication()
        .AddGoogle(options =>
        {
            options.CallbackPath = "/api/v1/auth/oauth/Google/callback";
            options.ClientId = googleClientId;
            options.ClientSecret = googleClientSecret;

            options.SignInScheme = IdentityConstants.ExternalScheme;
        });
}

var requireAuthPolicy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();

builder.Services.AddAuthorizationBuilder()
    .SetDefaultPolicy(requireAuthPolicy);

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
});

builder.Services.Scan(scan => scan
    .FromAssemblyOf<IRelationshipRepository>()
    .AddClasses(classes => classes.InNamespaces("Docsfer.Api.Repositories"))
    .AsImplementedInterfaces()
    .WithScopedLifetime());

builder.Services.AddControllers();
builder.Services.AddEmailServices(builder.Configuration);

builder.Services.AddDbContext<DocsferDbContext>(
    options => options.UseNpgsql(connectionString));

builder.Services.AddIdentityApiEndpoints<User>()
    .AddEntityFrameworkStores<DocsferDbContext>();

var app = builder.Build();

app.UseMiddleware<ExceptionHandlingMiddleware>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi("/api/docs/{documentName}.json");
}

app.MapControllers();

app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedProto | ForwardedHeaders.XForwardedFor,
    RequireHeaderSymmetry = false,
});
app.UseAuthentication();
app.UseAuthorization();

app.Run();