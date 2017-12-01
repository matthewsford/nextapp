/*   Copyright 2017 Matthew Ford <matthew@matthewford.us>
**
**   Licensed under the Apache License, Version 2.0 (the "License");
**   you may not use this file except in compliance with the License.
**   You may obtain a copy of the License at
**
**     http://www.apache.org/licenses/LICENSE-2.0
**
**   Unless required by applicable law or agreed to in writing, software
**   distributed under the License is distributed on an "AS IS" BASIS,
**   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
**   See the License for the specific language governing permissions and
**   limitations under the License.
*/
using System;
using MatthewFordUs.NextApp.WebApi.Models;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;

namespace MatthewFordUs.NextApp.WebApi {
  public class Startup {
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration) {
      Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services) {
      var configuration = Configuration.Get<MyOptions>();
      Console.WriteLine($"allowed origin: ${configuration.Origin}");
      services.AddCors(options => {
        options.AddPolicy("AllowSpecificOrigin",
          builder =>
            builder
              .WithOrigins(configuration.Origin)
              .AllowAnyMethod()
              .AllowAnyHeader());
      });

      services.AddDbContext<ApplicationDbContext>(options =>
        options.UseInMemoryDatabase(Guid.NewGuid().ToString()));
      //const string connection = @"Server=(localdb)\mssqllocaldb;Database=NextApp.SchoolDb;Trusted_Connection=True;";
      //services.AddDbContext<SchoolDbContext>(options => options.UseSqlServer(connection));
      services.AddDbContext<SchoolDbContext>(options =>
        options.UseInMemoryDatabase());

      services.AddIdentity<ApplicationUser, ApplicationRole>(options => {
          options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
          options.Lockout.MaxFailedAccessAttempts = 10;
          options.Lockout.AllowedForNewUsers = true;
          options.User.RequireUniqueEmail = true;
      })
        .AddEntityFrameworkStores<ApplicationDbContext>()
        .AddDefaultTokenProviders();

      services.ConfigureApplicationCookie(options =>
      {
        options.Cookie.Name = "YourAppCookieName";
        options.Cookie.HttpOnly = true;
        options.Cookie.Expiration = TimeSpan.FromDays(150);
        options.LoginPath = "/account/login";
        options.LogoutPath = "/account/logout";
        options.AccessDeniedPath = "/account/access-denied";
        options.SlidingExpiration = true;
        options.ReturnUrlParameter = CookieAuthenticationDefaults.ReturnUrlParameter;
      });

      services.AddMvc();
      services.Configure<MvcOptions>(options => {
        options.Filters.Add(new CorsAuthorizationFilterFactory("AllowSpecificOrigin"));
      });

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Info { Title = "My API", Version = "v1" });
      });
    }

    public void Configure(
      IApplicationBuilder app,
      IHostingEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      }
      else {
        app.UseExceptionHandler("/error");
      }

      app.UseAuthentication();
      app.UseMvc();

      app.UseSwagger();
      app.UseSwaggerUI(c =>
      {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
      });
    }
  }
}
