using EventPass.Services;
using EventPass.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;
using Microsoft.AspNetCore.Authorization;
using EventPass.Controllers.Models;
using Microsoft.VisualBasic;

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

        [HttpGet]
        [Authorize]
        [SwaggerOperation(Summary = "Obter dados do usuário autenticado.")]
        public Usuario Get()
        {
            var idUsuario = int.Parse(User.Claims.Where(c => c.Type == "id").FirstOrDefault().Value);

            var usuario = service.FindById(idUsuario);
            if (usuario == null)
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", idUsuario.ToString()), 404);
            }
            return usuario;
        }

        // POST api/<UsuariosController>
        [HttpPost]
        [SwaggerOperation(Summary = "Cria um novo usuário")]
        public void Post([FromBody] UsuarioCreateRequest usuario)
        {
            ValidarSenha(usuario.Senha, usuario.ConfirmarSenha);
            ValidarDocumento(usuario.Cpf);

            Usuario entity =  new Usuario
            {
                NomeUsuario = usuario.Nome,
                Email = usuario.Email,
                Senha = usuario.Senha,
                ConfirmarSenha = usuario.ConfirmarSenha,
                CPF = usuario.Cpf,
                Tipo = usuario.Tipo,
                TokenRedefinicaoSenha = ""
            };
            
            service.Create(entity);
        }

        // PUT api/<UsuariosController>/5
        [HttpPut("{id}")]
        [SwaggerOperation(Summary = "Atualiza um usuário")]
        public void Put(int id, [FromBody] UsuarioUpdateRequest usuario)
        {
            var idUsuario = int.Parse(User.Claims.Where(c => c.Type == "id").FirstOrDefault().Value);

            if (id != idUsuario)
            {
                throw new UnauthorizedAccessException(string.Format("Usuário logado não tem permissão para alterar dados do usuário com ID {0}", id));
            }
            
            ValidarSenha(usuario.Senha, usuario.ConfirmarSenha);
            
            Usuario entity =  new Usuario
            {
                NomeUsuario = usuario.Nome,
                Email = usuario.Email,
                Senha = usuario.Senha,
                ConfirmarSenha = usuario.ConfirmarSenha
            };

            if (!service.Update(id, entity))
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", id.ToString()), 404);
            }
        }

        // DELETE api/<UsuariosController>/5
        [HttpDelete("{id}")]
        [SwaggerOperation(Summary = "Deleta um usuário")]
        public void Delete(int id)
        {
            var idUsuario = int.Parse(User.Claims.Where(c => c.Type == "id").FirstOrDefault().Value);

            if (id != idUsuario)
            {
                throw new UnauthorizedAccessException(string.Format("Usuário logado não tem permissão para excluir dados do usuário com ID {0}", id));
            }

            if (!service.Delete(id))
            {
                throw new BadHttpRequestException(string.Format("Usuário com id {0} não foi encontrado", id.ToString()), 404);
            }
        }

        private void ValidarSenha(string senha, string confirmarSenha)
        {
            if (senha != confirmarSenha)
            {
                throw new BadHttpRequestException("Senhas não conferem.");
            }

            if (senha.Length < 8) 
            {
                throw new BadHttpRequestException("A senha deve possuir no mínimo 8 caracteres.");
            }
        }

        private void ValidarDocumento(string documento)
        {
            // TODO implementar regra de validação de CPF e CNPJ
        }
    }
}
