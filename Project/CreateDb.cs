using Microsoft.EntityFrameworkCore;
namespace Project;

public class ApplicationContext : DbContext
{
    public DbSet<ProjectModel> Projects { get; set; } = null!;              //Project table, which is in the database
    public DbSet<Account> Accounts { get; set; } = null!;                   //Account table, which is in the database
    
    public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
    {
        Database.EnsureCreatedAsync();                                      //if for some reason database not created, ensures it's creation
            
    }

}
