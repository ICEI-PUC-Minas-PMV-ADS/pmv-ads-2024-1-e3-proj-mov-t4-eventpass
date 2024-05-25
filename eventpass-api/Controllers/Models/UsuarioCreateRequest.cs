using EventPass.Models;

namespace EventPass.Controllers.Models 
{
    public class UsuarioCreateRequest
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string ConfirmarSenha { get; set; }
        public string Cpf { get; set; }
        public TipoUsuario Tipo { get; set; }
    }

}