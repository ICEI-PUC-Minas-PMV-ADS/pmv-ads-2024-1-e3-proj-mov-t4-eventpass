using EventPass.Models;

namespace EventPass.Services;

public class EventosService
{
    private readonly AppDbContext appDbContext;
    private readonly StorageService storageService;

    public EventosService(AppDbContext appDbContext, StorageService storageService)
    {
        this.appDbContext = appDbContext;
        this.storageService = storageService;
    }

    public List<Evento> GetTop(int? top)
    {
        var eventos = appDbContext.Eventos
            .OrderByDescending(e => e.DataHora)
            .Take(top ?? 3);

        foreach (Evento? evento in eventos)
        {
            evento.flyer = storageService.GetFileImageStorageUrl(evento.flyer);
        }

        return eventos.ToList();
    }

    public Evento? FindById(int id)
    {
        Evento? evento = appDbContext.Eventos.Find(id);
        if (evento != null) 
        {
            evento.flyer = storageService.GetFileImageStorageUrl(evento.flyer);
        }
        return appDbContext.Eventos.Find(id);
    }

    public bool Create(int idUsuario, Evento evento, IFormFile flyer)
    {
        Usuario? gestor = appDbContext.Usuarios.Find(idUsuario);
        if (gestor != null)
        {
            var fileName = storageService.SaveImage(flyer);
            evento.GestorId = idUsuario;
            evento.flyer = fileName;
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

    public bool Update(int idUsuario, int id, Evento evento, IFormFile flyer) 
    {
        Evento? eventoExistente = appDbContext.Eventos.Find(id);
        if (eventoExistente != null && eventoExistente.GestorId == idUsuario)
        {
            eventoExistente.NomeEvento = evento.NomeEvento;
            eventoExistente.DataHora = evento.DataHora;
            eventoExistente.Descricao = evento.Descricao;
            eventoExistente.TotalIngressos = evento.TotalIngressos;
            eventoExistente.Local = evento.Local;

            if (flyer != null) 
            {
                var fileName = storageService.SaveImage(flyer);
                eventoExistente.flyer = fileName;
            }

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
