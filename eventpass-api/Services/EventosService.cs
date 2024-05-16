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

    public bool Create(int idUsuario, Evento evento)
    {
        Usuario? gestor = appDbContext.Usuarios.Find(idUsuario);
        if (gestor != null)
        {
            evento.GestorId = idUsuario;
            evento.Ingressos = [];
            appDbContext.Eventos.Add(evento);
            appDbContext.SaveChanges();
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool Update(int idUsuario, int id, Evento evento) 
    {
        Evento? eventoExistente = appDbContext.Eventos.Find(id);
        if (eventoExistente != null && eventoExistente.GestorId == idUsuario) 
        {
            eventoExistente.NomeEvento = evento.NomeEvento;
            eventoExistente.Data = evento.Data;
            eventoExistente.Hora = evento.Hora;
            eventoExistente.Descricao = evento.Descricao;
            eventoExistente.TotalIngressos = evento.TotalIngressos;
            eventoExistente.Local = evento.Local;
            eventoExistente.flyer = evento.flyer;

            appDbContext.Eventos.Update(eventoExistente);
            appDbContext.SaveChanges();
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool Delete(int idUsuario, int id) 
    {
        Evento? eventoExistente = appDbContext.Eventos.Find(id);
        if (eventoExistente != null && eventoExistente.GestorId == idUsuario) 
        {
            appDbContext.Eventos.Remove(eventoExistente);
            appDbContext.SaveChanges();
            return true;
        }
        else
        {
            return false;
        }
    }
}
