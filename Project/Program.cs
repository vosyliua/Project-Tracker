using Project;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.FileProviders;


var builder = WebApplication.CreateBuilder(args);
string connection = "Server=(localdb)\\mssqllocaldb; Database=project; Trusted_Connection=True; MultipleActiveResultSets=True";
builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
builder.Services.AddDirectoryBrowser();
var app = builder.Build();

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "wwwroot")),
    RequestPath = "/index",
    EnableDirectoryBrowsing = true
});


app.MapPost("/api/users", async ( Account accountData, ApplicationContext db ) =>
{
    Account? account = await  db.Accounts.FirstOrDefaultAsync(x=> x.Username == accountData.Username);
    if(account != null)
    {
        if (account.Password == accountData.Password)
        {
            return Results.Ok(account);

        }
        else
        {
            return Results.NotFound(new { message = "Account not found" });
        }
    }
    else
    {
        return Results.NotFound(new { message = "Account not found" });
    }
    
});

app.MapPost("/api/usersR", async (Account accountData, ApplicationContext db) =>
{
    Account? account = await db.Accounts.FirstOrDefaultAsync(x => x.Username == accountData.Username);
    if (account == null)
    {   
        await db.Accounts.AddAsync(accountData);
        await db.SaveChangesAsync();
        return Results.Ok(new { message = "Account Created with username" + accountData.Username });
    }
    else
    {
        return Results.NotFound("Account already exists " + accountData.Username);
    }
});


app.MapGet("/api/usersall", async (ApplicationContext db) =>
{
     var people = await db.Accounts.ToListAsync();
    return Results.Ok(people);
    
});


app.MapPost("/api/projects", async (ProjectModel projectData, ApplicationContext db) =>
{
    ProjectModel? project = await db.Projects.FirstOrDefaultAsync(x => x.Title == projectData.Title);
    if(project== null)
    {
        await db.Projects.AddAsync(projectData);
        await db.SaveChangesAsync();
        return Results.Ok(projectData);

    }
    else
    {
        return Results.Conflict(new { message = "Could not add project" + projectData.Title });
    }
});

app.MapGet("/api/projects", async (ApplicationContext db) =>
{
    var projects = await db.Projects.ToListAsync();
    return Results.Ok(projects);
});


app.Run();
