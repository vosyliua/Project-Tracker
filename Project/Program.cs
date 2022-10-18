using Project;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.FileProviders;
using System.Web.Helpers;

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



app.MapGet("/api/users", async ( ApplicationContext db , HttpContext context) =>
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();

    Account? account = await  db.Accounts.FirstOrDefaultAsync(x=> x.Username == authToken1);
    if(account != null)
    {
        if (Crypto.VerifyHashedPassword(account.Password, authToken2) == true)
        {
            return Results.Ok(account);

        }
        else
        {
            return Results.Unauthorized();
        }
    }
    else
    {
        return Results.Unauthorized();
    }
    
});

app.MapPost("/api/usersR", async (Account accountData, ApplicationContext db, HttpContext context) =>
{
    var passwordHash = Crypto.HashPassword(accountData.Password);
    Account? account = await db.Accounts.FirstOrDefaultAsync(x => x.Username == accountData.Username);
    
    if (account == null)
    {
        accountData.Password = passwordHash;
        await db.Accounts.AddAsync(accountData);
        await db.SaveChangesAsync();
        return Results.Ok();
    }
    else
    {
        return Results.Conflict();
    }
});


app.MapGet("/api/usersall", async (ApplicationContext db, HttpContext context) =>

{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if(auth!= null & Crypto.VerifyHashedPassword(auth.Password,  authToken2) == true)
    {
        var people = await db.Accounts.ToListAsync();
        return Results.Ok(people);
    }
    else
    {
        return Results.Unauthorized();
    }
    
    
    
});


app.MapPost("/api/projects", async (ProjectModel projectData, ApplicationContext db, HttpContext context) =>
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)
    {
        ProjectModel? project = await db.Projects.FirstOrDefaultAsync(x => x.Title == projectData.Title);
        if (project == null)
        {
            await db.Projects.AddAsync(projectData);
            await db.SaveChangesAsync();
            return Results.Ok(projectData);

        }
        else
        {
            return Results.Conflict(new { message = "Could not add project" + projectData.Title });
        }
    }
    else
    {
        return Results.Unauthorized();
    }
    
    
    
});


app.MapGet("/api/projects", async (ApplicationContext db, HttpContext context) =>
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    var authToken3 = context.Request.Headers["Path"].ToString();
    Console.WriteLine(authToken3);
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    Console.WriteLine(auth.Password + " from db query");
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)
    {
        Console.WriteLine(authToken3);
        var projects = await db.Projects.ToListAsync();
        return Results.Ok(projects);
    }
    else
    {
        return Results.Unauthorized();
    }
        
});

app.MapPut("/api/projects",  async (ProjectModel projectData, ApplicationContext db, HttpContext context) =>
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)
    {
        ProjectModel? project = await db.Projects.FirstOrDefaultAsync(x => x.Id == projectData.Id);
        if (project == null)
        {
            return Results.Conflict(new { message = "Could not update project" + projectData.Title });
        }
        else
        {
            project.Priority = projectData.Priority;
            project.DueBy = projectData.DueBy;
            project.BriefStatus = projectData.BriefStatus;
            project.ConceptStatus = projectData.ConceptStatus;
            project.DesignStatus = projectData.DesignStatus;
            project.MockupStatus = projectData.MockupStatus;
            project.Progress = projectData.Progress;
            project.ResearchStatus = projectData.ResearchStatus;
            await db.SaveChangesAsync();
            return Results.Json(project);
        }
    }
    else
    {
        return Results.Unauthorized();
    };
       
    

});

app.MapDelete("/api/projects/{id:int}", async (int id , ApplicationContext db, HttpContext context) =>
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)
    {
        ProjectModel? project = await db.Projects.FirstOrDefaultAsync(x => x.Id == id);
        if (project == null)
        {
            return Results.Conflict(new { message = "Project not found" });

        }
        else
        {
            db.Projects.Remove(project);
            await db.SaveChangesAsync();
            return Results.Ok(project);
        }
    }
    else
    {
        return Results.Unauthorized();
    }
        
});

app.UseMiddleware<AuthenticationMiddleware>();
app.Run();
