using Microsoft.EntityFrameworkCore;
namespace Project
{
    public class ApplicationContext : DbContext
    {
        public DbSet<ProjectModel> Projects { get; set; } = null!;
        public DbSet<Account> Accounts { get; set; } = null!;
        
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
            Database.EnsureCreatedAsync();

        }

    }
}
