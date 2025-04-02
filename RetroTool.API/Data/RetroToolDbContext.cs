using Microsoft.EntityFrameworkCore;
using RetroTool.API.Models;

namespace RetroTool.API.Data
{
    public class RetroToolDbContext : DbContext
    {
        public RetroToolDbContext(DbContextOptions<RetroToolDbContext> options) : base(options) { }


        public DbSet<RetroCategory> Categories { get; set; }
        public DbSet<RetroCard> Cards { get; set; }
        public DbSet<Poll> Polls { get; set; }
        public DbSet<PollOption> PollOptions { get; set; }
        public DbSet<PollVote> PollVotes { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Poll>()
                .HasMany(p => p.Options)
                .WithOne(o => o.Poll)
                .HasForeignKey(o => o.PollId);

            modelBuilder.Entity<PollOption>()
                .HasMany(o => o.Votes)
                .WithOne(v => v.Option)
                .HasForeignKey(v => v.OptionId);
        }
    }
}
