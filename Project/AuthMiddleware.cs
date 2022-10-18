namespace Project;
using System.Text;
using Microsoft.AspNetCore.Http.Extensions;
using Microsoft.EntityFrameworkCore;

public class AuthenticationMiddleware
{
    private readonly RequestDelegate _next;
    public AuthenticationMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task InvokeAsync(HttpContext context, ApplicationContext db)
    {
        if (context.Request.Path == "/api/usersR")
        {
            await _next(context);
        }
        string authHeader = context.Request.Headers["Authorization"];
        if (authHeader != null && authHeader.StartsWith("Basic"))
        {
            //Extract credentials
            string encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
            Encoding encoding = Encoding.GetEncoding("iso-8859-1");
            string usernamePassword = encoding.GetString(Convert.FromBase64String(encodedUsernamePassword));

            int seperatorIndex = usernamePassword.IndexOf(':');
            var username = usernamePassword.Substring(0, seperatorIndex);
            var password = usernamePassword.Substring(seperatorIndex + 1);
            if (username.Length >= 5)
            {
                if (password.Length >= 5)
                {
                    context.Request.Headers["Username"] = username;
                    context.Request.Headers["Password"] = password;
                    context.Request.Headers["Path"] = context.Request.GetEncodedUrl();
                    await _next(context);

                }
            }
            else
            {
                context.Response.StatusCode = 401; //Unauthorized
                return;
            }
        }
        else
        {
            // no authorization header
            context.Response.StatusCode = 401; //Unauthorized
            return;
        }
    }
}