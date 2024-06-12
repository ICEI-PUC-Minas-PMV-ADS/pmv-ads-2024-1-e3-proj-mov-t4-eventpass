using EventPass.Controllers.Models;
using EventPass.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

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
        [Authorize]
        [SwaggerOperation(Summary = "Obter os ingressos por usuário")]
        public IEnumerable<IngressoResponse> GetByIdUsuario()
        {
            var idUsuario = int.Parse(User.Claims.Where(c => c.Type == "id").FirstOrDefault().Value);

            var ingressos = ingressosService.FindByIdUsuario(idUsuario);
            return ingressos.Select(ingresso => new IngressoResponse
            {
                IdIngresso = ingresso.Id,
                IdEvento = ingresso.IdEvento,
                IdUsuario = ingresso.IdUsuario,
                NomeEvento = ingresso.Evento.NomeEvento,
                DataEvento = ingresso.Evento.DataHora,
                LocalEvento = ingresso.Evento.Local,
                FlyerEvento = ingresso.Evento.Flyer
            });
        }

        // DELETE api/<IngressosController>/5
        [HttpDelete("{id}")]
        [Authorize]
        [SwaggerOperation(Summary = "Deleta os ingressos por usuário")]
        public void Delete(int id)
        {
            var idUsuario = int.Parse(User.Claims.Where(c => c.Type == "id").FirstOrDefault().Value);

            if (!ingressosService.Delete(idUsuario, id))
            {
                throw new BadHttpRequestException(string.Format("Ingresso com ID {0} não foi encontrado ou não pertence ao usuário {1}.", id.ToString(), idUsuario.ToString()), 404);
            }
        }
    }
}
