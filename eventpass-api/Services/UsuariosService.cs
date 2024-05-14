namespace EventPass.Services;

using EventPass.Models;

public class UsuariosService
{

    private readonly AppDbContext appDbContext;

    public UsuariosService(AppDbContext appDbContext)
    {
        this.appDbContext = appDbContext;
    }

    public Usuario? FindById(int id) 
    {
        return appDbContext.Usuarios.Find(id);
    }

    public void Create(Usuario usuario) 
    {
        appDbContext.Usuarios.Add(usuario);
        appDbContext.SaveChanges();
    }

    public bool Delete(int id) 
    {
        var usuario = appDbContext.Usuarios.Find(id);
        if (usuario != null) 
        {
            appDbContext.Usuarios.Remove(usuario);
            appDbContext.SaveChanges();
            return true;
        }
        else
        {
            return false;
        }
    }

    public bool Update(int id, Usuario usuario) 
    {
        var found = appDbContext.Usuarios.Find(id);
        if (found != null) 
        {
            appDbContext.Usuarios.Update(usuario);
            appDbContext.SaveChanges();
            return true;
        }
        else
        {
            return false;
        }
    }
}
