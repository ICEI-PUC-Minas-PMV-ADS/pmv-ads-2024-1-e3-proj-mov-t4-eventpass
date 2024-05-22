using EventPass.Models;
using EventPass.Services;
using EventPass.Controllers.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

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
        [SwaggerOperation(Summary = "Obter os principais eventos", Description = "Retorna os principais eventos, com limite opcional de eventos.")]
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
                    DataHora = evento.DataHora,
                    Descricao = evento.Descricao,
                    TotalIngressos = evento.TotalIngressos,
                    Local = evento.Local,
                    Flyer = evento.Flyer
                })
                .ToList();
        }

        [HttpGet("buscar")]
        [SwaggerOperation(Summary ="Busca de eventos")]
        public IEnumerable<EventoResponse> BuscarEventos(string query)
        {
            List<Evento> result = service.BuscarEventos(query);
            return result
                .Select(evento => new EventoResponse()
                {
                    Id = evento.IdEvento,
                    Nome = evento.NomeEvento,
                    DataHora = evento.DataHora,
                    Descricao = evento.Descricao,
                    TotalIngressos = evento.TotalIngressos,
                    Local = evento.Local,
                    Flyer = evento.Flyer
                })
                .ToList();
        }

        // GET api/<EventosController>/5
        [HttpGet("{id}")]
        [SwaggerOperation(Summary = "Obter evento por ID", Description = "Retorna um evento específico pelo seu ID.")]
        public EventoResponse Get(int id)
        {
            Evento? evento = service.FindById(id);
            if (evento == null)
            {
                throw new BadHttpRequestException(string.Format("Evento com id {0} não foi encontrado", id.ToString()), 404);
            }

            return new EventoResponse
            {
                Id = evento.IdEvento,
                Nome = evento.NomeEvento,
                DataHora = evento.DataHora,
                Descricao = evento.Descricao,
                TotalIngressos = evento.TotalIngressos,
                Local = evento.Local,
                Flyer = evento.Flyer
            };
        }

        // POST api/<EventosController>
        [HttpPost]
        [SwaggerOperation(Summary = "Criar um novo evento", Description = "Cria um novo evento com base nos dados fornecidos.")]
        public IActionResult Post([FromHeader(Name = "IdUsuario")] int idUsuario, [FromForm] EventoRequest evento)
        {
            Evento entity = new Evento
            {
                NomeEvento = evento.Nome,
                DataHora = evento.DataHora,
                Descricao = evento.Descricao,
                TotalIngressos = evento.TotalIngressos,
                Local = evento.Local
            };

            if (!service.Create(idUsuario, entity, evento.Flyer))
            {
                throw new BadHttpRequestException(string.Format("Usuário com ID {0} não foi encontrado para ser gestor do evento.", idUsuario.ToString()), 404);
            }

            return Created();
        }

        // PUT api/<EventosController>/5
        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Atualizar evento por ID", Description = "Atualiza um evento existente com os novos dados fornecidos.")]
        public void Put([FromHeader(Name = "IdUsuario")] int idUsuario, int id, [FromForm] EventoRequest evento)
        {
            Evento entity = new Evento
            {
                NomeEvento = evento.Nome,
                DataHora = evento.DataHora,
                Descricao = evento.Descricao,
                TotalIngressos = evento.TotalIngressos,
                Local = evento.Local,
                Flyer = evento.Flyer.FileName
            };

            if (!service.Update(idUsuario, id, entity, evento.Flyer))
            {
                throw new BadHttpRequestException(string.Format("Evento com ID {0} não foi encontrado ou não pertence ao usuário {1}.", id.ToString(), idUsuario.ToString()), 404);
            }
        }

        // DELETE api/<EventosController>/5
        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Excluir evento por ID", Description = "Exclui um evento específico pelo seu ID.")]
        public void Delete([FromHeader(Name = "IdUsuario")] int idUsuario, int id)
        {
            if (!service.Delete(idUsuario, id))
            {
                throw new BadHttpRequestException(string.Format("Evento com ID {0} não foi encontrado ou não pertence ao usuário {1}.", id.ToString(), idUsuario.ToString()), 404);
            }
        }

        [HttpPost("{id}/retirar-ingresso")]
        [SwaggerOperation(Summary = "Retira ingresso para um evento")]
        public void RetirarIngresso([FromHeader(Name = "IdUsuario")] int idUsuario, int id)
        {
            if(!service.RetirarIngresso(id, idUsuario))
            {
                throw new BadHttpRequestException(string.Format("Não foi possível retirar ingresssos para o evento ID {0} e usuário ID {1}. Limite de ingressos excedido.", id.ToString(), idUsuario.ToString()), 400);
            }
        }
    }
}
