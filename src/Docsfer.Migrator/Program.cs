using Docsfer.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateSlimBuilder(args);

var connectionString = builder.Configuration["ConnectionStrings:Default"];

builder.Services.AddDbContext<DocsferDbContext>(options =>
{
    options.UseNpgsql(connectionString, x =>
    {
        x.MigrationsAssembly("Docsfer.EntityFrameworkCore");
    });
});

var app = builder.Build();

using var scope = app.Services.CreateScope();

var db = scope.ServiceProvider.GetRequiredService<DocsferDbContext>();
await db.Database.MigrateAsync();
