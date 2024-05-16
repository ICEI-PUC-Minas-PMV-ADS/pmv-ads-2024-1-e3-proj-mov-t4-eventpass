namespace EventPass.Controllers.Models;

public class EventoRequest
{
    public string Nome { get; set; }
    public DateTime Data { get; set; }
    public DateTime Hora { get; set; }
    public int TotalIngressos { get; set; }
    public string Descricao { get; set; }
    public string Local { get; set; }
    public IFormFile Flyer { get; set; }
}
