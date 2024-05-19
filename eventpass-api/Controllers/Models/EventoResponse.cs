namespace EventPass.Controllers.Models
{
    public class EventoResponse
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public DateTime DataHora { get; set; }
        public int TotalIngressos { get; set; }
        public string Descricao { get; set; }
        public string Local { get; set; }
        public string Flyer { get; set; }
    }
}
