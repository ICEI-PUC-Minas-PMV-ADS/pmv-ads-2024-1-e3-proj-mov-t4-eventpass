using Microsoft.EntityFrameworkCore;

namespace EventPass.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Ingresso> Ingressos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Ingresso>().HasKey(u => u.Id);
            modelBuilder.Entity<Evento>().HasKey(u => u.IdEvento);
            modelBuilder.Entity<Usuario>().HasKey(u => u.Id);

            modelBuilder.Entity<Ingresso>()
                .HasOne(i => i.Evento)
                .WithMany(i => i.Ingressos)
                .HasForeignKey(i => i.IdEvento)
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();

            modelBuilder.Entity<Ingresso>()
                .HasOne(i => i.Usuario)
                .WithMany(i => i.Ingressos)
                .HasForeignKey(i => i.IdUsuario)
                .OnDelete(DeleteBehavior.NoAction)
                .IsRequired();

            modelBuilder.Entity<Evento>()
               .HasOne(e => e.Usuario)
               .WithMany(u => u.Eventos)
               .HasForeignKey(e => e.GestorId)
               .OnDelete(DeleteBehavior.NoAction)
               .IsRequired();
        }

    }
}
