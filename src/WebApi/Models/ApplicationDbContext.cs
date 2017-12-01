using System;
using MatthewFordUs.NextApp.Common;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MatthewFordUs.NextApp.WebApi.Models {
  public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid> {
    public ApplicationDbContext(DbContextOptions options)
      : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity<Student>()
        .HasKey(s => new { s.Id, s.ETag });
    }

  }
}
