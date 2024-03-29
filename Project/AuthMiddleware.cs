﻿namespace Project;
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
        if (context.Request.Path == "/api/usersR")                                  //Checks if the request path is for user registration, passes if it is
        {
            await _next(context);
            return;
        }
        string authHeader = context.Request.Headers["Authorization"];
        if (authHeader != null && authHeader.StartsWith("Basic"))                   //checks if the authorization header starts with Basic and isn't null
        {
            //Extract credentials
            string encodedUsernamePassword = authHeader.Substring("Basic ".Length).Trim();
            Encoding encoding = Encoding.GetEncoding("iso-8859-1");
            string usernamePassword = encoding.GetString(Convert.FromBase64String(encodedUsernamePassword));    //removes Basic keyword, seperates user and password, which is seperated by : in the original string

            int seperatorIndex = usernamePassword.IndexOf(':');
            var username = usernamePassword.Substring(0, seperatorIndex);
            var password = usernamePassword.Substring(seperatorIndex + 1);
            if (username.Length >= 5)                                                                   //checks if username and password is atleast 5 characters long
            {
                if (password.Length >= 5)
                {
                    context.Request.Headers["Username"] = username;                                     //sets custom headers to the credentials, which are used in later routes for authorization
                    context.Request.Headers["Password"] = password;
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