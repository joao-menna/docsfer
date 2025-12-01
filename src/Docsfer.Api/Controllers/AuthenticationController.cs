using System.Security.Claims;
using Docsfer.Core.Exceptions.Identity;
using Docsfer.Core.Identity;
using Docsfer.Core.Shared.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Docsfer.Api.Controllers;

[ApiController]
[Route("api/v1/auth")]
public class AuthenticationController(
    SignInManager<User> signInManager,
    UserManager<User> userManager,
    IConfiguration configuration) : ControllerBase
{
    [Authorize]
    [HttpGet("me")]
    public IActionResult GetMyId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (userId is null)
        {
            return Unauthorized(new
            {
                message = "User with no ID",
            });
        }

        var guid = Guid.Parse(userId);

        return Ok(new
        {
            userId = guid
        });
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterInput input)
    {
        var userCheck = await userManager.FindByEmailAsync(input.Email);

        if (userCheck is not null)
        {
            throw new EmailAlreadyRegisteredException();
        }

        var result = await RegisterInternalAsync(input);

        if (result != IdentityResult.Success)
        {
            throw new CouldNotRegisterUserException();
        }

        return Created();
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginInput input)
    {
        var user = await userManager.FindByEmailAsync(input.Email) ?? throw new EmailInvalidException();

        if (!await userManager.CheckPasswordAsync(user, input.Password))
        {
            throw new PasswordInvalidException();
        }

        var result = await signInManager.PasswordSignInAsync(
            input.Email, input.Password, input.RememberMe, true);

        if (!result.Succeeded)
        {
            throw new AccountLockedOutException();
        }

        return Ok();
    }

    [HttpGet("oauth/{provider}")]
    public IActionResult Oauth(string provider)
    {
        var redirectUrl = GetRedirectUrl("home");
        var properties = signInManager.ConfigureExternalAuthenticationProperties(provider, redirectUrl);

        return Challenge(properties, provider);
    }

    [HttpGet("oauth/{provider}/callback")]
    public async Task<IActionResult> OauthCallback(string provider)
    {
        var info = await signInManager.GetExternalLoginInfoAsync() ?? throw new PasswordInvalidException();

        var result = await signInManager.ExternalLoginSignInAsync(provider, info.ProviderKey, true, true);

        if (result.Succeeded)
        {
            return Redirect(GetRedirectUrl("home"));
        }

        return Redirect(GetRedirectUrl("login"));
    }

    private async Task<IdentityResult> RegisterInternalAsync(RegisterInput input)
    {
        var user = new User
        {
            UserName = input.Email,
            NormalizedUserName = input.Email,
            Email = input.Email,
            EmailConfirmed = true,
        };

        return await userManager.CreateAsync(user, input.Password);
    }

    private string GetRedirectUrl(string suffix)
    {
        var appRoot = configuration["ApplicationRoot"];
        var redirectUrl = $"{appRoot}/{suffix}";

        return redirectUrl;
    }
}
