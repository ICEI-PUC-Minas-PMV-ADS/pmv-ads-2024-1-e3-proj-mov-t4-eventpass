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
                found.NomeUsuario = usuario.NomeUsuario;
                found.CPF = usuario.CPF;
                found.Email = usuario.Email;
                found.Senha = usuario.Senha;
                found.ConfirmarSenha = usuario.ConfirmarSenha;
                found.Tipo = usuario.Tipo;

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