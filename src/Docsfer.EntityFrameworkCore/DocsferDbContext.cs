using Docsfer.Core.Blobs;
using Docsfer.Core.Chat;
using Docsfer.Core.Groups;
using Docsfer.Core.Identity;
using Docsfer.Core.Relationships;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Docsfer.EntityFrameworkCore;

public class DocsferDbContext(DbContextOptions<DocsferDbContext> options) :
    IdentityDbContext<User, Role, Guid>(options)
{
    public DbSet<Group> Groups { get; set; }
    public DbSet<GroupUser> GroupUsers { get; set; }
    public DbSet<Relationship> Relationships { get; set; }
    public DbSet<BlobEntry> BlobEntries { get; set; }
    public DbSet<ChatMessage> ChatMessages { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        CreateIdentityModels(builder);

        CreateGroupModels(builder);

        CreateBlobModels(builder);
    }

    private static void CreateIdentityModels(ModelBuilder builder)
    {
        builder.Entity<User>(b =>
        {
            b.ToTable("User");
        });

        builder.Entity<IdentityUserClaim<Guid>>(b =>
        {
            b.ToTable("UserClaim");
        });

        builder.Entity<IdentityUserLogin<Guid>>(b =>
        {
            b.HasKey(e => new { e.LoginProvider, e.ProviderKey });
            b.ToTable("UserLogin");
        });

        builder.Entity<IdentityUserToken<Guid>>(b =>
        {
            b.HasKey(e => new { e.UserId, e.LoginProvider, e.Name });
            b.ToTable("UserToken");
        });

        builder.Entity<Role>(b =>
        {
            b.ToTable("Role");
        });

        builder.Entity<IdentityRoleClaim<Guid>>(b =>
        {
            b.ToTable("RoleClaim");
        });

        builder.Entity<IdentityUserRole<Guid>>(b =>
        {
            b.HasKey(e => new { e.RoleId, e.UserId });
            b.ToTable("UserRole");
        });
    }

    private static void CreateGroupModels(ModelBuilder builder)
    {
        builder.Entity<Group>(b =>
        {
            b.ToTable("Group");
        });

        builder.Entity<GroupUser>(b =>
        {
            b.ToTable("GroupUser");
        });

        builder.Entity<Group>()
            .HasMany(e => e.Users)
            .WithMany(e => e.Groups)
            .UsingEntity<GroupUser>();

        builder.Entity<Relationship>(b =>
        {
            b.ToTable("Relationship");
        });

        builder.Entity<Relationship>()
            .HasMany(e => e.Blobs);
    }

    private static void CreateBlobModels(ModelBuilder builder)
    {
        builder.Entity<BlobEntry>(b =>
        {
            b.ToTable("BlobEntry");
        });

        builder.Entity<BlobEntry>()
            .HasOne(e => e.Relationship);
    }
}
