using Project;
using Microsoft.EntityFrameworkCore;
using System;
using Microsoft.Extensions.FileProviders;
using System.Web.Helpers;

var builder = WebApplication.CreateBuilder(args); //create a builder, which registers services, like the creation of a database
string connection = "Server=(localdb)\\mssqllocaldb; Database=project; Trusted_Connection=True; MultipleActiveResultSets=True";
builder.Services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connection));
builder.Services.AddDirectoryBrowser(); // allows us to browse the dirrectory
var app = builder.Build();

app.UseFileServer(new FileServerOptions
{
    FileProvider = new PhysicalFileProvider(
           Path.Combine(builder.Environment.ContentRootPath, "wwwroot")),
    RequestPath = "/index",
    EnableDirectoryBrowsing = true
}); // Allows to use files from the local machine



app.MapGet("/api/users", async ( ApplicationContext db , HttpContext context) => //Get route to retrieve a specific user
{
    var authToken1 = context.Request.Headers["Username"].ToString();            // Header tokens, which are used to check if user exists in the database
    var authToken2 = context.Request.Headers["Password"].ToString();

    Account? account = await  db.Accounts.FirstOrDefaultAsync(x=> x.Username == authToken1);
    if(account != null)
    {
        if (Crypto.VerifyHashedPassword(account.Password, authToken2) == true)  //Compares non-hashed password with hashed password, and returns if they match
        {
            return Results.Ok(account);

        }
        else
        {
            return Results.Unauthorized();                                      // returns unauthorized status code 409, if the password don't match
        }
    }
    else
    {
        return Results.Unauthorized();                                          // returns unauthorized status code 409, if the username wasn't found in the database.
    }
    
});

app.MapPost("/api/usersR", async (Account accountData, ApplicationContext db, HttpContext context) =>       //POST route, which registers a user
{
    var passwordHash = Crypto.HashPassword(accountData.Password);
    Account? account = await db.Accounts.FirstOrDefaultAsync(x => x.Username == accountData.Username);      //Checks if user already in database
    
    if (account == null)                                                                                    //If user doesn't exist, hashes password and stores data
    {
        if(accountData.Password.Length >= 5 && accountData.Username.Length >= 5)                            //checks if the input is at least 5 characters long
        {
            accountData.Password = passwordHash;
            await db.Accounts.AddAsync(accountData);
            await db.SaveChangesAsync();
            return Results.Ok("Account created!");
        }
        else
        {
            return Results.Conflict();
        }

    }
    else
    {
        return Results.Conflict();
    }
});


app.MapGet("/api/usersall", async (ApplicationContext db, HttpContext context) =>                           //route that returns all the users

{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if(auth!= null & Crypto.VerifyHashedPassword(auth.Password,  authToken2) == true)                       // verifying credentials
    {
        var people = await db.Accounts.ToListAsync();
        return Results.Ok(people);
    }
    else
    {
        return Results.Unauthorized();
    }
    
    
    
});


app.MapPost("/api/projects", async (ProjectModel projectData, ApplicationContext db, HttpContext context) =>     // route to add a project 
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)                          // verifying credentials
    {
        ProjectModel? project = await db.Projects.FirstOrDefaultAsync(x => x.Title == projectData.Title);       //checks if project already exists in the database
        if (project == null)
        {
            await db.Projects.AddAsync(projectData);
            await db.SaveChangesAsync();
            return Results.Ok(project);

        }
        else
        {
            return Results.Conflict(new { message = "Could not add project " + projectData.Title });
        }
    }
    else
    {
        return Results.Unauthorized();
    }
    
    
    
});


app.MapGet("/api/projects", async (ApplicationContext db, HttpContext context) =>       //Retrieves all of the projects in the database
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    var authToken3 = context.Request.Headers["Path"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)      //credential authorization
    {
        var projects = await db.Projects.ToListAsync();                                     //returns all projects
        return Results.Ok(projects);
    }
    else
    {
        return Results.Unauthorized();
    }
        
});

app.MapPut("/api/projects",  async (ProjectModel projectData, ApplicationContext db, HttpContext context) =>    //route to update an existing project
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)                          //checks credentials
    {
        ProjectModel? project = await db.Projects.FirstOrDefaultAsync(x => x.Id == projectData.Id);             //checks if project exists
        if (project == null)
        {
            return Results.Conflict(new { message = "Could not update project" + projectData.Title });
        }
        else
        {
            project.Priority = projectData.Priority;                                                            //updates the existing project with new data
            project.DueBy = projectData.DueBy;
            project.BriefStatus = projectData.BriefStatus;
            project.ConceptStatus = projectData.ConceptStatus;
            project.DesignStatus = projectData.DesignStatus;
            project.MockupStatus = projectData.MockupStatus;
            project.Progress = projectData.Progress;
            project.ResearchStatus = projectData.ResearchStatus;
            await db.SaveChangesAsync();
            return Results.Json("Updated!");
        }
    }
    else
    {
        return Results.Unauthorized();
    };
});

app.MapDelete("/api/projects/{id:int}", async (int id , ApplicationContext db, HttpContext context) =>          //route to delete a specific project
{
    var authToken1 = context.Request.Headers["Username"].ToString();
    var authToken2 = context.Request.Headers["Password"].ToString();
    Account? auth = await db.Accounts.FirstOrDefaultAsync(x => x.Username == authToken1);                       //verify credentials
    if (auth != null & Crypto.VerifyHashedPassword(auth.Password, authToken2) == true)
    {
        ProjectModel? project = await db.Projects.FirstOrDefaultAsync(x => x.Id == id);                         //checks for project
        if (project == null)
        {
            return Results.Conflict(new { message = "Project not found" });

        }
        else
        {
            if(project.Owner == authToken1)
            {
                db.Projects.Remove(project);                                                                        //removes project if found
                await db.SaveChangesAsync();
                return Results.Ok(project.Title + " Deleted!");
            }
            else
            {
                return Results.Unauthorized();
            }
           
        }
    }
    else
    {
        return Results.Unauthorized();
    }
        
});



app.UseMiddleware<AuthenticationMiddleware>();                                                                  //uses authorization middleware, which extracts a token from the headers off httprequest
app.Run();
