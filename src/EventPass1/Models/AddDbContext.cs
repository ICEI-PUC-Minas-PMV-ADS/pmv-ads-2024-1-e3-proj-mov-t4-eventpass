﻿using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using EventPass1.Models;

namespace EventPass1.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Evento> Eventos { get; set; }
        public DbSet<Ingresso> Ingressos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Ingresso>()
                .HasOne(i => i.Evento)
                .WithMany(i => i.Ingressos)
                .HasForeignKey(i => i.IdEvento)
                .IsRequired();

            modelBuilder.Entity<Ingresso>()
                .HasOne(i => i.Usuario)
                .WithMany(i => i.Ingressos)
                .HasForeignKey(i => i.IdUsuario)
                .IsRequired();

            modelBuilder.Entity<Evento>()
               .HasOne(e => e.Usuario)
               .WithMany(u => u.Eventos)
               .HasForeignKey(e => e.GestorId)
               .IsRequired();
            base.OnModelCreating(modelBuilder);
        }

    }
}
