using EventPass.Models;

namespace EventPass.Services;

public class EventosService
{
    private readonly AppDbContext appDbContext;

    public EventosService(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }

    public List<Evento> GetTop(int? top)
    {
        return appDbContext.Eventos
            .OrderByDescending(e => e.Data)
            .Take(top ?? 3)
            .ToList();
    }
}
