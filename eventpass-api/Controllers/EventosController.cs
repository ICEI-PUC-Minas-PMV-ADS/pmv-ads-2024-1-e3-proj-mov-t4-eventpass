using EventPass.Models;
using EventPass.Services;
using EventPass.Controllers.Models;
using Microsoft.AspNetCore.Mvc;

namespace EventPass.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventosController : ControllerBase
    {
        private readonly EventosService service;
        private readonly UsuariosService usuariosService;
        public EventosController(EventosService service, UsuariosService usuariosService)
        {
            this.service = service;
            this.usuariosService = usuariosService;
        }

        [HttpGet]
        public IEnumerable<EventoResponse> GetTop(int? top = 3)
        {
            if (top.HasValue && top.Value > 50)
            {
                throw new BadHttpRequestException("A quantidade máxima de eventos não pode ultrapassar 50.");
            }
            
            List<Evento> result = service.GetTop(top);
            return result
                .Select(evento => new EventoResponse()
                {
                    Id = evento.IdEvento,
                    Nome = evento.NomeEvento,
                    Data = evento.Data,
                    Hora = evento.Hora,
                    Descricao = evento.Descricao,
                    TotalIngressos = evento.TotalIngressos,
                    Local = evento.Local,
                    GestorId = evento.GestorId,
                    Flyer = evento.flyer,
                    UsuarioId = evento.Usuario == null ? 0 : evento.Usuario.Id
                })
                .ToList();
        }

        // GET api/<EventosController>/5
        [HttpGet("{id}")]
        public EventoResponse Get(int id)
        {
            Evento evento = service.FindById(id);
            if (evento == null)
            {
                throw new BadHttpRequestException(string.Format("Evento com id {0} não foi encontrado", id.ToString()), 404);
            }

            return new EventoResponse
            {
                Id = evento.IdEvento,
                Nome = evento.NomeEvento,
                Data = evento.Data,
                Hora = evento.Hora,
                Descricao = evento.Descricao,
                TotalIngressos = evento.TotalIngressos,
                Local = evento.Local,
                GestorId = evento.GestorId,
                Flyer = evento.flyer,
                UsuarioId = evento.Usuario == null ? 0 : evento.Usuario.Id
            };
        }

        // POST api/<EventosController>
        [HttpPost]
        public void Post([FromBody] EventoRequest evento)
        {
            Usuario? usuario = usuariosService.FindById(evento.UsuarioId);
            if (usuario == null)
            {
                throw new BadHttpRequestException(string.Format("Usuário com ID {0} não foi encontrado para ser utilizado no evento.", evento.UsuarioId));
            }

            Evento entity = new Evento
            {
                NomeEvento = evento.Nome,
                Data = evento.Data,
                Hora = evento.Hora,
                Descricao = evento.Descricao,
                TotalIngressos = evento.TotalIngressos,
                Local = evento.Local,
                GestorId = evento.GestorId,
                flyer = evento.Flyer,
                Usuario = usuario,
                Ingressos = []
            };

            service.Create(entity);
        }

        // PUT api/<EventosController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] EventoRequest evento)
        {
            Usuario? usuario = usuariosService.FindById(evento.UsuarioId);
            if (usuario == null)
            {
                throw new BadHttpRequestException(string.Format("Usuário com ID {0} não foi encontrado para ser utilizado no evento.", evento.UsuarioId));
            }

            Evento entity = new Evento
            {
                NomeEvento = evento.Nome,
                Data = evento.Data,
                Hora = evento.Hora,
                Descricao = evento.Descricao,
                TotalIngressos = evento.TotalIngressos,
                Local = evento.Local,
                GestorId = evento.GestorId,
                flyer = evento.Flyer,
                Usuario = usuario,
                Ingressos = []
            };

            if (!service.Update(id, entity))
            {
                throw new BadHttpRequestException(string.Format("Evento com ID {0} não foi encontrado", id.ToString()), 404);
            }
        }

        // DELETE api/<EventosController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            if (!service.Delete(id))
            {
                throw new BadHttpRequestException(string.Format("Evento com ID {0} não foi encontrado", id.ToString()), 404);
            }
        }
    }
}
