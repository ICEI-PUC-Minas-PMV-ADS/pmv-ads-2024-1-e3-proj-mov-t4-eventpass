namespace EventPass.Controllers.Models;

public class EventoResponse
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public DateTime Data { get; set; }
    public DateTime Hora { get; set; }
    public int TotalIngressos { get; set; }
    public string Descricao { get; set; }
    public string Local { get; set; }
    public int GestorId { get; set; }
    public string Flyer { get; set; }
    public int UsuarioId { get; set; }
}
