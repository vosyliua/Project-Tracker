using Microsoft.EntityFrameworkCore;
namespace Project
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Project> Projects { get; set; } = null!;
        public DbSet<Account> Accounts { get; set; } = null!;

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreated();
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Project>().HasData(
                new Project { Id = 1, Title = "Test1", Owner = "david" }
            );
        }
    }
}
