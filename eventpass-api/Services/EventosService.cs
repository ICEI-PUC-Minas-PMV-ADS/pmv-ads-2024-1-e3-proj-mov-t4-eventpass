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

    public Evento FindById(int id)
    {
        return appDbContext.Eventos.Find(id);
    }

    public void Create(Evento evento) 
    {
        appDbContext.Eventos.Add(evento);
        appDbContext.SaveChanges();
    }

    public bool Update(int id, Evento evento) 
    {
        Evento found = appDbContext.Eventos.Find(id);
        if (found != null) 
        {
            found.NomeEvento = evento.NomeEvento;
            found.Data = evento.Data;
            found.Hora = evento.Hora;
            found.Descricao = evento.Descricao;
            found.TotalIngressos = evento.TotalIngressos;
            found.Local = evento.Local;
            found.GestorId = evento.GestorId;
            found.flyer = evento.flyer;
            found.Usuario = evento.Usuario;
            found.Ingressos = evento.Ingressos;

            appDbContext.Eventos.Update(found);
            appDbContext.SaveChanges();
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool Delete(int id) 
    {
        var evento = appDbContext.Eventos.Find(id);
        if (evento != null) 
        {
            appDbContext.Eventos.Remove(evento);
            appDbContext.SaveChanges();
            return true;
        }
        else
        {
            return false;
        }
    }
}
