using EventPass.Controllers.Models;
using EventPass.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EventPass.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IngressosController : ControllerBase
    {
        private readonly IngressosService ingressosService;
        public IngressosController(IngressosService ingressosService)
        {
            this.ingressosService = ingressosService;
        }

        // GET: api/<IngressosController>
        [HttpGet]
        public IEnumerable<IngressoResponse> GetByIdUsuario([FromHeader(Name = "IdUsuario")] int idUsuario)
        {
            var ingressos = ingressosService.FindByIdUsuario(idUsuario);
            return ingressos.Select(ingresso => new IngressoResponse {
                IdIngresso = ingresso.Id,
                IdEvento = ingresso.IdEvento,
                IdUsuario = ingresso.IdUsuario,
                NomeEvento = ingresso.Evento.NomeEvento,
                DataEvento = ingresso.Evento.DataHora
            });
        }

        // DELETE api/<IngressosController>/5
        [HttpDelete("{id}")]
        public void Delete([FromHeader(Name = "IdUsuario")] int idUsuario, int id)
        {
            if (!ingressosService.Delete(idUsuario, id))
            {
                throw new BadHttpRequestException(string.Format("Ingresso com ID {0} não foi encontrado ou não pertence ao usuário {1}.", id.ToString(), idUsuario.ToString()), 404);
            }
        }
    }
}
