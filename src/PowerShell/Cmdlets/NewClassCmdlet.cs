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

namespace MatthewFordUs.NextApp.PowerShell.Cmdlets {
  public class Class {
    public string FirstName { get; set; }
    public string LastName { get; set; }

    public Class(string first, string last) {
      FirstName = first;
      LastName = last;
    }
  }

  [Cmdlet(VerbsCommon.New, "Class")]
  public class NewClassCmdlet : Cmdlet {
    [Parameter(Position=1, Mandatory = true)]
    public string GivenName { get; set; } = "Trevor";

    [Parameter(Position=2, Mandatory = true)]
    public string Surname { get; set; } = "Sullivan";
    private HttpClient _client;


    protected override void BeginProcessing() {
      base.BeginProcessing();
      _client = new HttpClient();
    }

    protected override async void ProcessRecord()
    {
      WriteObject(new Class(GivenName, Surname));

      try
      {
        var response = await _client.GetAsync("http://www.contoso.com/");
        response.EnsureSuccessStatusCode();
        var responseBody = await response.Content.ReadAsStringAsync();

        WriteObject(responseBody);
      }
      catch (HttpRequestException e)
      {
        WriteError(new ErrorRecord(e, "errerId", ErrorCategory.InvalidOperation, _client));
      }
    }

    protected override void EndProcessing() {
      _client.Dispose();
      base.EndProcessing();
    }

    protected override void StopProcessing() {
      _client.Dispose();
      base.StopProcessing();
    }
  }
}
