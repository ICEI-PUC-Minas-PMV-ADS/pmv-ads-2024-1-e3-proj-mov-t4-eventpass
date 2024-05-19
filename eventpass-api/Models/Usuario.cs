using System.ComponentModel.DataAnnotations;

namespace EventPass.Models
{
    public enum TipoUsuario
    {
        Espectador,
        Gestor
    }

    public class Usuario
    {
        public int Id { get; set; }
        public TipoUsuario Tipo { get; set; }
        public string NomeUsuario { get; set; }
        public string Email { get; set; }
        public string Senha { get; set; }
        public string ConfirmarSenha { get; set; }
        public string CPF { get; set; }
        public string TokenRedefinicaoSenha { get; set; }
        public ICollection<Evento> Eventos { get; set; }
        public ICollection<Ingresso> Ingressos { get; set; }
    }
}

