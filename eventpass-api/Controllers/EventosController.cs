using EventPass.Models;
using EventPass.Services;
using Microsoft.AspNetCore.Mvc;

namespace EventPass.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventosController : ControllerBase
    {

        private readonly EventosService service;
        public EventosController(EventosService service)
        {
            this.service = service;
        }

        [HttpGet]
        public IEnumerable<Evento> GetTop(int? top = 3)
        {
            if (top.HasValue && top.Value > 50) {
                throw new BadHttpRequestException("A quantidade máxima de eventos não pode ultrapassar 50.");
            }
            return service.GetTop(top);
        }

        // GET api/<EventosController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<EventosController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<EventosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<EventosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
