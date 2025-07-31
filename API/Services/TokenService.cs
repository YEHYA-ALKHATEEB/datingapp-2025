using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.interfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;
// TokenService implements ITokenService using JWT
public class TokenService(IConfiguration config) : ITokenService
{
        // Generates a JWT token for the given AppUser
    public string CreateToken(AppUser user)
    {
        var tokenKey = config["TokenKey"] ?? throw new Exception("Cannot get token key");
        // Ensure the key is secure enough (64+ characters)
        if (tokenKey.Length < 64) throw new Exception("Your token key needs to be >=64 characters");
        // Create a symmetric security key from the token key
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));
        // Define claims to include in the token payload
        var claims = new List<Claim>
        {
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id),

        };
        // Create signing credentials using the key and HMAC SHA512
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
        // Define token parameters such as claims and expiration
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
        };
        // Create and write the token using JwtSecurityTokenHandler
        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        // Return the serialized token string
        return tokenHandler.WriteToken(token);

    }
}
