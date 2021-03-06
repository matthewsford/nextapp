using FluentAssertions;
using MatthewFordUs.NextApp.WebApi.Controllers;
using Xunit;

namespace MatthewFordUs.NextApp.WebApi.UnitTests.Controllers {
  public class ValuesControllerTest {
    [Fact]
    public void Get_Should_ReturnBothValues() {
      var controller = new ValuesController();

      var result = controller.Get();

      result.Should().BeEquivalentTo("value1", "value2");
    }

    [Fact]
    public void Get_Should_ReturnValue_Given_5() {
      var controller = new ValuesController();

      var result = controller.Get(5);

      result.Should().BeEquivalentTo("value");
    }

    [Fact]
    public void Post_Should_Exist() {
      var controller = new ValuesController();

      controller.Post("value");
    }

    [Fact]
    public void Patch_Should_Exist() {
      var controller = new ValuesController();

      controller.Patch(5, "value");
    }

    [Fact]
    public void Delete_Should_Exist() {
      var controller = new ValuesController();

      controller.Delete(5);
    }
  }
}
