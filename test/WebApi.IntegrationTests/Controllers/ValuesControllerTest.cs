using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.Logging;
using Xunit;

namespace MatthewFordUs.NextApp.WebApi.IntegrationTests.Controllers {
  public class ValuesControllerTest {
    readonly HttpClient _client;

    public ValuesControllerTest() {
      var server = new TestServer(
        new WebHostBuilder()
          .ConfigureLogging((hostingContext, logging) => {
            logging.AddConfiguration(hostingContext.Configuration.GetSection("Logging"));
            logging.SetMinimumLevel(LogLevel.Debug);
            logging.AddDebug();
          })
          .UseStartup<Startup>());
      _client = server.CreateClient();
    }
  }
}
