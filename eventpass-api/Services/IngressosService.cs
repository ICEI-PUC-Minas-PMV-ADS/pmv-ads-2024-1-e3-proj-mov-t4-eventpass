using EventPass.Models;

namespace EventPass.Services
{
    public class IngressosService
    {
        private readonly AppDbContext appDbContext;

        public IngressosService(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public List<Ingresso> FindByIdUsuario(int idUsuario)
        {
            return appDbContext.Ingressos
                .Where(ingresso => ingresso.IdUsuario == idUsuario)
                .Select(ingresso => new Ingresso
                {
                    Id = ingresso.Id,
                    IdEvento = ingresso.IdEvento,
                    IdUsuario = ingresso.IdUsuario,
                    Evento = ingresso.Evento,
                    Usuario = ingresso.Usuario
                })
                .ToList();
        }

        public bool Delete(int idUsuario, int id) 
        {
            Ingresso? ingressoExistente = appDbContext.Ingressos
                .Where(ingresso => ingresso.Id == id && ingresso.IdUsuario == idUsuario)
                .FirstOrDefault();

            if (ingressoExistente != null)
            {
                appDbContext.Ingressos.Remove(ingressoExistente);
                appDbContext.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }

        public int CountByIdEvento(int idEvento)
        {
            return appDbContext.Ingressos
                .Where(ingresso => ingresso.IdEvento == idEvento)
                .Count();
        }

        public int CountByIdEvento(int idEvento, int idUsuario)
        {
            return appDbContext.Ingressos
                .Where(ingresso => ingresso.IdEvento == idEvento && ingresso.IdUsuario == idUsuario)
                .Count();
        }

        public void Create(int idEvento, int idUsuario)
        {
            Ingresso ingresso = new Ingresso
            {
                IdEvento = idEvento,
                IdUsuario = idUsuario
            };
            appDbContext.Ingressos.Add(ingresso);
            appDbContext.SaveChanges();
        }
    }
}

