using EventPass.Services;
using EventPass.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

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
        public void Post([FromBody] Usuario usuario)
        {
            service.Create(usuario);
        }

        // PUT api/<UsuariosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Usuario usuario)
        {
            if (!service.Update(id, usuario))
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", id.ToString()), 404);
            }
        }

        // DELETE api/<UsuariosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            if (!service.Delete(id))
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", id.ToString()), 404);
            }
        }
    }
}
