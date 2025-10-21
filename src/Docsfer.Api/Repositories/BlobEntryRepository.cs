using Docsfer.Core.Blobs;
using Docsfer.Core.Relationships;
using Docsfer.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Docsfer.Api.Repositories;

public class BlobEntryRepository(DocsferDbContext context) : IBlobEntryRepository
{
    public async Task<ICollection<BlobEntry>> GetAllInRelationAsync(Relationship relationship)
    {
        return await context.BlobEntries
            .OrderBy(b => b.CreatedAt)
            .Where(b => b.Relationship == relationship)
            .ToListAsync();
    }

    public async Task<BlobEntry?> GetBlobByFileName(Relationship relationship, string fileName)
    {
        return await context.BlobEntries
            .Where(b => b.Relationship == relationship && b.FileName == fileName)
            .FirstOrDefaultAsync();
    }

    public async Task InsertAsync(BlobEntry blobEntry)
    {
        await context.BlobEntries.AddAsync(blobEntry);
        await context.SaveChangesAsync();
    }

    public async Task<BlobEntry?> FindByIdAsync(long id)
    {
        return await context.BlobEntries.SingleOrDefaultAsync(b => b.Id == id);
    }

    public async Task UpdateAsync(BlobEntry blobEntry)
    {
        context.BlobEntries.Update(blobEntry);
        await context.SaveChangesAsync();
    }
}
