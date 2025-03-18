using Microsoft.EntityFrameworkCore;
using RetroTool.API.Models;

namespace RetroTool.API.Data
{
    public class RetroToolDbContext : DbContext
    {
        public RetroToolDbContext(DbContextOptions<RetroToolDbContext> options) : base(options) { }

        public DbSet<RetroCategory> Categories { get; set; }
        public DbSet<RetroCard> Cards { get; set; }
    }
}
