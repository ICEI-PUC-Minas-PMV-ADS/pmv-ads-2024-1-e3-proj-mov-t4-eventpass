using EventPass.Controllers.Models;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using EventPass.Services;
using System.Security.Claims;
using EventPass.Models;
using Microsoft.OpenApi.Extensions;

namespace EventPass.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private IConfiguration configuration;
        private UsuariosService usuariosService;
        public LoginController(IConfiguration configuration, UsuariosService usuariosService)
        {
            this.configuration = configuration;
            this.usuariosService = usuariosService;
        }

        // POST api/<LoginController>
        [HttpPost]
        public IActionResult Post([FromBody] LoginRequest loginRequest)
        {
            Usuario? usuario = usuariosService.AuthenticateUser(loginRequest.Username, loginRequest.Password);
            if (usuario != null)
            {
                var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["ApplicationSettings:JwtSecret"]));
                var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

                var claims = new List<Claim> {
                    new Claim("id", usuario.Id.ToString()),
                    new Claim("email", usuario.Email),
                    new Claim("nome", usuario.NomeUsuario),
                    new Claim("role", usuario.Tipo.GetDisplayName())
                };
                var issuer = configuration["ApplicationSettings:Issuer"];
                var sectoken = new JwtSecurityToken(
                    issuer, 
                    issuer,
                    claims,
                    expires: DateTime.Now.AddMinutes(120),
                    signingCredentials: credentials
                );

                var token = new JwtSecurityTokenHandler().WriteToken(sectoken);

                return Ok(token);
            }
            else
            {
                return BadRequest("Username or password incorrect.");
            }
        }
    }
}
