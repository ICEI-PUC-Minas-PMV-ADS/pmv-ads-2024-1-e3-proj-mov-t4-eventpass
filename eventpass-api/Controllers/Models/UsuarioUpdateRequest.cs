namespace EventPass.Controllers.Models 
{
    public class UsuarioUpdateRequest
    {
        public string Nome { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string ConfirmarSenha { get; set; }
    }

}