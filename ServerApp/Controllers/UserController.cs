using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

using ServerApp.CustomFilters;
using ServerApp.DTO;
using ServerApp.Models;

namespace ServerApp.Controllers {
    [ApiController]
    [Route ("api/[controller]")]
    public class UserController : ControllerBase {
        private UserManager<User> _userManager;
        private SignInManager<User> _signInManager;

        public readonly IConfiguration _configuration;

        public UserController (UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration) {
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._configuration = configuration;
        }

        [ValidModel]
        [HttpPost ("register")]
        public async Task<IActionResult> Register (UserForRegisterDTO model) {
            var user = new User {
                Name = model.Name,
                UserName = model.UserName,
                Email = model.Email,
                Gender = model.Gender,
                Created = DateTime.Now,
                LastActive = DateTime.Now
            };

            var result = await _userManager.CreateAsync (user, model.Password);

            if (result.Succeeded) return StatusCode (201);

            return BadRequest (result.Errors);
        }

        [HttpPost ("login")]
        [ValidModel]
        public async Task<IActionResult> Login (UserForLoginDTO model) {

            throw new Exception ("Interval Exception");

            var user = await _userManager.FindByNameAsync (model.UserName);

            if (user == null) return BadRequest (new { message = "Username is incorret." });

            var result = await _signInManager.CheckPasswordSignInAsync (user, model.Password, false);

            if (!result.Succeeded) return Unauthorized ();

            return Ok (new { token = GenerateJwtToken (user) });
        }

        private string GenerateJwtToken (User user) {
            var tokenHandler = new JwtSecurityTokenHandler ();
            var key = Encoding.ASCII.GetBytes (_configuration.GetSection ("AppSettings:Secret").Value);

            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity (new Claim[] {
                new Claim (ClaimTypes.NameIdentifier, user.Id.ToString ()),
                new Claim (ClaimTypes.Name, user.Name.ToString ()),
                }),
                Expires = DateTime.UtcNow.AddDays (1), // 1 gün geçerli
                SigningCredentials = new SigningCredentials (new SymmetricSecurityKey (key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken (tokenDescriptor);

            return tokenHandler.WriteToken (token);
        }
    }
}
