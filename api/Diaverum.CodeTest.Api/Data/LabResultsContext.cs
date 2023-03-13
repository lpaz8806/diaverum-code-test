using Diaverum.CodeTest.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Diaverum.CodeTest.Api.Data;

public class LabResultsContext : DbContext
{
    public LabResultsContext(DbContextOptions<LabResultsContext> options) : base(options) { }

    public DbSet<LabResults> LabResults { get; set; }
}
