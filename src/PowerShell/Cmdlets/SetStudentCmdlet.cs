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
using System.Management.Automation;
using System.Net.Http;
using System.Net.Http.Headers;
using MatthewFordUs.NextApp.Common;

namespace MatthewFordUs.NextApp.PowerShell.Cmdlets {
  [Cmdlet(VerbsCommon.Set, "Student")]
  public class SetStudentCmdlet : PSCmdlet {
    [Parameter(Position=1, Mandatory = true)]
    public string GivenName { get; set; } = "Trevor";

    [Parameter(Position=2, Mandatory = true)]
    public string Surname { get; set; } = "Sullivan";

    private HttpClient _client;

    protected override void BeginProcessing()
    {
      base.BeginProcessing();
      _client = new HttpClient {
        BaseAddress = new Uri("http://localhost:5000/api/students")
      };
      _client.DefaultRequestHeaders.Accept.Clear();
      _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
    }

    protected override async void ProcessRecord() {
      var student = new Student {
        GivenName = GivenName,
        Surname = Surname
      };

      try
      {
        var response = await _client.PostAsJsonAsync("http://localhost:5000/api/students", student);
        response.EnsureSuccessStatusCode();
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseBody);
      }
      catch (HttpRequestException e)
      {
        Console.WriteLine("\nException Caught!");
        Console.WriteLine("Message :{0} ", e.Message);
      }
      WriteObject(student);
    }

    protected override void EndProcessing()
    {
      _client.Dispose();
      base.EndProcessing();
    }

    protected override void StopProcessing()
    {
      _client.Dispose();
      base.StopProcessing();
    }
  }
}
