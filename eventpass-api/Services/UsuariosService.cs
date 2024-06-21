using EventPass.Models;

namespace EventPass.Services
{
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
            Usuario? usuario = appDbContext.Usuarios.Find(id);
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
            Usuario? found = appDbContext.Usuarios.Find(id);
            if (found != null)
            {
                if (usuario.NomeUsuario != null)
                {
                    found.NomeUsuario = usuario.NomeUsuario;
                }

                if (usuario.Email != null)
                {
                    found.Email = usuario.Email;
                }

                if (usuario.Senha != null)
                {
                    found.Senha = usuario.Senha;
                }

                if (usuario.ConfirmarSenha != null)
                {
                    found.ConfirmarSenha = usuario.ConfirmarSenha;
                }

                appDbContext.Usuarios.Update(found);
                appDbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public Usuario? AuthenticateUser(string username, string password)
        {
            Usuario? found = appDbContext.Usuarios.Where(u => u.Email == username).FirstOrDefault();
            if (found != null)
            {
                // Verificar com senha criptografada
                if(found.Senha == password)
                {
                    return found;
                }
            }
            
            return null;
        }
    }

}