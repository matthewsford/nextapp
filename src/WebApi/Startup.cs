using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Cors;
using Microsoft.AspNetCore.Mvc.Cors.Internal;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace MatthewFordUs.NextApp.WebApi {
  public class Startup {
    public IConfiguration Configuration { get; }

    public Startup(IConfiguration configuration) {
      Configuration = configuration;
    }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services) {
      var configuration = Configuration.Get<MyOptions>();
      services.AddCors(options => {
        options.AddPolicy("AllowSpecificOrigin",
          builder =>
            builder
              .WithOrigins(configuration.Origin)
              .AllowAnyMethod()
              .AllowAnyHeader());
      });
      services.AddMvc();
      services.Configure<MvcOptions>(options => {
        options.Filters.Add(new CorsAuthorizationFilterFactory("AllowSpecificOrigin"));
      });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(
      IApplicationBuilder app,
      IHostingEnvironment env) {
      if (env.IsDevelopment()) {
        app.UseDeveloperExceptionPage();
      }

      /*app.UseCors(builder =>
        builder
          .WithOrigins(configuration.Origin)
          .AllowAnyHeader()
          .AllowAnyMethod());*/
      app.UseMvc();
    }
  }
}
