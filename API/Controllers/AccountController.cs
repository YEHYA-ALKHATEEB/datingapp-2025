using System.Security.Cryptography;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController(AppDbContext context) : BaseApiController
{
    // This controller will handle account-related actions such as login, registration, etc.
    [HttpPost("register")]  // api/account/register
    public async Task<ActionResult<AppUser>> Register(string email, string password, string displayName)
    {
        using var hmac = new HMACSHA512();

        var user = new AppUser
        {
            DisplayName = displayName,
            Email = email,
            PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)),
            PasswordSalt = hmac.Key,
            
        };

        context.Users.Add(user);

        await context.SaveChangesAsync();
        return user;
    }
}