using EventPass.Services;
using EventPass.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using Swashbuckle.AspNetCore.Annotations;

namespace EventPass.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly UsuariosService service;
        public UsuariosController(UsuariosService service)
        {
            this.service = service;
        }

        // GET api/<UsuariosController>/5
        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Obter o usuário por id")]

        public Usuario Get(int id)
        {
            var usuario = service.FindById(id);
            if (usuario == null)
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", id.ToString()), 404);
            }
            return usuario;
        }

        // POST api/<UsuariosController>
        [HttpPost]
        [SwaggerOperation(Summary = "Cria um novo usuário")]
        public void Post([FromBody] Usuario usuario)
        {
            service.Create(usuario);
        }

        // PUT api/<UsuariosController>/5
        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Atualiza um usuário")]
        public void Put(int id, [FromBody] Usuario usuario)
        {
            if (!service.Update(id, usuario))
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", id.ToString()), 404);
            }
        }

        // DELETE api/<UsuariosController>/5
        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Deleta um usuário")]
        public void Delete(int id)
        {
            if (!service.Delete(id))
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", id.ToString()), 404);
            }
        }
    }
}
