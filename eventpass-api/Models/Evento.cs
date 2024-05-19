namespace EventPass.Models;

public class Evento
{
    public int IdEvento { get; set; }
    public string NomeEvento { get; set; }
    public DateTime DataHora { get; set; }
    public int TotalIngressos { get; set; }
    public string Descricao { get; set; }
    public string Local { get; set; }
    public int GestorId { get; set; }
    public string flyer { get; set; }
    public Usuario Usuario { get; set; }
    public ICollection<Ingresso> Ingressos { get; set; }
}
