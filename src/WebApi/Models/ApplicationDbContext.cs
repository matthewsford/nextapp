using System;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace MatthewFordUs.NextApp.WebApi.Models {
  public class ApplicationDbContext : IdentityDbContext<ApplicationUser, ApplicationRole, Guid> {
    public ApplicationDbContext(DbContextOptions options)
      : base(options) { }
  }
}
