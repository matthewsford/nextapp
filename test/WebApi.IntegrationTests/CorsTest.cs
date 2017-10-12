using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Xunit;

namespace MatthewFordUs.NextApp.WebApi.IntegrationTests {
  public class CorsTest {
    private readonly HttpClient _client;

    public CorsTest() {
      var dict = new Dictionary<string, string>
      {
        {"Origin", "http://localhost:4200"}
      };

      var builder = new ConfigurationBuilder();
      builder.AddInMemoryCollection(dict);
      var configuration = builder.Build();

      var server = new TestServer(
        new WebHostBuilder()
        .UseConfiguration(configuration)
          .ConfigureLogging((hostingContext, logging) => {
            logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
            logging.SetMinimumLevel(LogLevel.Debug);
            logging.AddDebug();
          })
          .UseStartup<Startup>());
      _client = server.CreateClient();
    }

    [Fact]
    public async void Cors_Should_Fail_Given_UnexpectedOrigin() {
      _client.DefaultRequestHeaders.Add("Origin", "http://localhost:4201");
      var response = await _client.DeleteAsync("/api/values/5");

      response.StatusCode.Should().Be(HttpStatusCode.OK);
      var corsHeaders = from h in response.Headers
        where h.Key == "Access-Control-Allow-Origin"
        select h;
      corsHeaders.Count().Should().Be(0);
    }

    [Fact]
    public async void Cors_Should_Pass_Given_ExpectedOrigin()
    {
      _client.DefaultRequestHeaders.Add("Origin", "http://localhost:4200");
      var response = await _client.DeleteAsync("/api/values/5");

      response.StatusCode.Should().Be(HttpStatusCode.OK);
      var corsHeaders = from h in response.Headers
        where h.Key == "Access-Control-Allow-Origin"
        select h;
      corsHeaders.Count().Should().Be(1);
      corsHeaders.Single().Value.Single().Should().Be("http://localhost:4200");
    }
  }
}
