using Microsoft.EntityFrameworkCore;
using RetroTool.API.Models;
using RetroToolAPI.Models;

namespace RetroTool.API.Data
{
    public class RetroToolDbContext : DbContext
    {
        public RetroToolDbContext(DbContextOptions<RetroToolDbContext> options) : base(options) { }

        // 🧩 Aktif tablolar
        public DbSet<Card> Cards { get; set; }
        public DbSet<Poll> Polls { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Şu anda özel ilişki gerektiren bir yapı yok.
        }
    }
}
