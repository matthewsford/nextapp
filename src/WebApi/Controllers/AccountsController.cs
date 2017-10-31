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
using System.Runtime.Serialization;
using System.Threading.Tasks;
using MatthewFordUs.NextApp.WebApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace MatthewFordUs.NextApp.WebApi.Controllers {
  [Route("api/accounts")]
  public class AccountsController : Controller {
    private readonly ILogger<AccountsController> _logger;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AccountsController(
      ILogger<AccountsController> logger,
      UserManager<ApplicationUser> userManager,
      SignInManager<ApplicationUser> signInManager) {
      _logger = logger;
      _userManager = userManager;
      _signInManager = signInManager;
    }

    [HttpPost]
    [Route("register")]
    [AllowAnonymous]
    public async Task<IActionResult> Register([FromBody] RegistrationRequest model) {
      if (ModelState.IsValid) {
        var user = new ApplicationUser {UserName = model.Email, Email = model.Email, PasswordHash = model.PasswordHash};
        var result = await _userManager.CreateAsync(user);
        if (result.Succeeded) {
          // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=532713
          // Send an email with this link
          //var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
          //var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.Id, code = code }, protocol: HttpContext.Request.Scheme);
          //await _emailSender.SendEmailAsync(model.Email, "Confirm your account",
          //    "Please confirm your account by clicking this link: <a href=\"" + callbackUrl + "\">link</a>");
          await _signInManager.SignInAsync(user, isPersistent: false);
          _logger.LogInformation(LoggingEvents.AccountCreated, "User created a new account with password.");
          return Ok(new RegistrationResponse() {Status = "account created"});
        }
      }

      return BadRequest(new RegistrationResponse {Status = "bad request"});
    }

    [HttpPost]
    [Route("login")]
    [AllowAnonymous]
    public async Task<IActionResult> Login(LoginRequestModel model) {
      if (ModelState.IsValid) {
        // This doesn't count login failures towards account lockout
        // To enable password failures to trigger account lockout, set lockoutOnFailure: true
        var result = await _signInManager.PasswordSignInAsync(model.Email,
          model.PasswordHash, model.RememberMe, lockoutOnFailure: false);
        if (result.Succeeded) {
          _logger.LogInformation(LoggingEvents.LoginSucceeded, "User logged in.");
          return Ok(new LoginResponseModel {Status = "login succeeded"});
        }
        if (result.RequiresTwoFactor) {
          //TODO
          //return RedirectToAction(nameof(SendCode), new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
        }
        if (result.IsLockedOut) {
          _logger.LogWarning(LoggingEvents.AccountIsLocked, "User account locked out.");
          return BadRequest(new LoginResponseModel {Status = "account is locked"});
        }
        else {
          ModelState.AddModelError(string.Empty, "Invalid login attempt.");
          return BadRequest(new LoginResponseModel {Status = "lnvalid login attempt"});
        }
      }
      return BadRequest(new LoginResponseModel {Status = "bad request"});
    }

    [HttpPost]
    [Route("logout")]
    public async Task<IActionResult> LogOut() {
      await _signInManager.SignOutAsync();
      _logger.LogInformation(4, "User logged out.");
      return Ok();
    }
  }

  [DataContract]
  public class LoginResponseModel {
    [DataMember(Name = "status")]
    public string Status { get; set; }
  }

  [DataContract]
  public class LoginRequestModel {
    [DataMember(Name = "email")]
    public string Email { get; set; }

    [DataMember(Name = "passwordHash")]
    public string PasswordHash { get; set; }

    [DataMember(Name = "rememberMe")]
    public bool RememberMe { get; set; }
  }

  [DataContract]
  public class RegistrationRequest {
    [DataMember(Name = "email")]
    public string Email { get; set; }

    [DataMember(Name = "passwordHash")]
    public string PasswordHash { get; set; }
  }

  [DataContract]
  public class RegistrationResponse {
    [DataMember(Name = "status")]
    public string Status { get; set; }
  }
}
