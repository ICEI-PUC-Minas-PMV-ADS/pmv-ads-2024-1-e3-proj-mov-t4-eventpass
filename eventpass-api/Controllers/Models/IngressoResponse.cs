namespace EventPass.Controllers.Models
{
    public class IngressoResponse
    {
        public int IdIngresso { get; set; }
        public int IdEvento { get; set; }
        public int IdUsuario { get; set; }
        public string NomeEvento { get; set; }
        public DateTime DataEvento { get; set; }
        public string LocalEvento { get; set; }
        public string FlyerEvento { get; set; }
    }
}
