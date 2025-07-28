namespace API.Data;

using API.Entities;
using Microsoft.EntityFrameworkCore;
public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public DbSet<AppUser> Users { get; set; }
}