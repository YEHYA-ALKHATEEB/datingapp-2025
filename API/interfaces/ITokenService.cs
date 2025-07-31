
using API.Entities;

namespace API.interfaces;
// Defines the contract for a token service
public interface ITokenService
{
    // Generates a token for the provided user
    string CreateToken(AppUser user);
}
