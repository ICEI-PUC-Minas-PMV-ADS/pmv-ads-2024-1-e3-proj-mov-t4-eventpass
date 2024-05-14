using EventPass.Services;
using EventPass.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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
                throw new Exception(string.Format("Usuário com id {} não foi encontrado", id.ToString()));
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
            bool updated = service.Update(id, usuario);
            if (!updated)
            {
                throw new Exception(string.Format("Usuário com id {} não foi encontrado", id.ToString()));
            }
        }

        // DELETE api/<UsuariosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            bool deleted = service.Delete(id);
            if (!deleted)
            {
                throw new Exception(string.Format("Usuário com id {} não foi encontrado", id.ToString()));
            }
        }
    }
}
