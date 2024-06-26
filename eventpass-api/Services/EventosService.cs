﻿using EventPass.Models;

namespace EventPass.Services
{
    public class EventosService(AppDbContext appDbContext, StorageService storageService, IngressosService ingressosService, EmailService emailService, UsuariosService usuariosService, ILogger<EventosService> logger)
    {
        private const int QUANTIDADE_MAXIMA_INGRESSOS_EVENTO = 3;

        public List<Evento> GetTop(int? top)
        {
            var eventos = appDbContext.Eventos
                .OrderByDescending(e => e.DataHora)
                .Take(top ?? 3);

            foreach (Evento? evento in eventos)
            {
                evento.Flyer = storageService.GetFileImageStorageUrl(evento.Flyer);
            }

            return eventos.ToList();
        }

        public List<Evento> BuscarEventos(string query)
        {
            var eventos = appDbContext.Eventos
                .Where(e => e.NomeEvento.ToUpper().Contains(query.ToUpper()) || e.Descricao.ToUpper().Contains(query.ToUpper()))
                .OrderByDescending(e => e.DataHora)
                .Take(10);
            
            foreach (Evento? evento in eventos)
            {
                evento.Flyer = storageService.GetFileImageStorageUrl(evento.Flyer);
            }

            return eventos.ToList();
        }

        public List<Evento> FindByIdUsuario(int idUsuario)
        {
            var eventos = appDbContext.Eventos
                .Where(e => e.GestorId == idUsuario)
                .OrderByDescending(e => e.DataHora)
                .Take(10);
            
            foreach (Evento? evento in eventos)
            {
                evento.Flyer = storageService.GetFileImageStorageUrl(evento.Flyer);
            }

            return eventos.ToList();
        }

        public Evento? FindById(int id)
        {
            Evento? evento = appDbContext.Eventos.Find(id);
            if (evento != null)
            {
                evento.Flyer = storageService.GetFileImageStorageUrl(evento.Flyer);
            }
            return appDbContext.Eventos.Find(id);
        }

        public bool Create(int idUsuario, Evento evento, IFormFile Flyer)
        {
            Usuario? gestor = appDbContext.Usuarios.Find(idUsuario);
            if (gestor != null)
            {
                var fileName = storageService.SaveImage(Flyer);
                evento.GestorId = idUsuario;
                evento.Flyer = fileName;
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

        public bool Update(int idUsuario, int id, Evento evento, IFormFile Flyer)
        {
            Evento? eventoExistente = appDbContext.Eventos.Find(id);
            if (eventoExistente != null && eventoExistente.GestorId == idUsuario)
            {
                eventoExistente.NomeEvento = evento.NomeEvento;
                eventoExistente.DataHora = evento.DataHora;
                eventoExistente.Descricao = evento.Descricao;
                eventoExistente.TotalIngressos = evento.TotalIngressos;
                eventoExistente.Local = evento.Local;

                if (Flyer != null)
                {
                    var fileName = storageService.SaveImage(Flyer);
                    eventoExistente.Flyer = fileName;
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

        public bool RetirarIngresso(int id, int idUsuario)
        {
            Evento? evento = appDbContext.Eventos.Find(id);
            Usuario? usuario = usuariosService.FindById(idUsuario);
            int quantidadeIngressosEvento = ingressosService.CountByIdEvento(id);
            int quantidadeIngressosUsuarioEvento = ingressosService.CountByIdEvento(id, idUsuario);

            if (evento != null
                && usuario != null
                && quantidadeIngressosUsuarioEvento < QUANTIDADE_MAXIMA_INGRESSOS_EVENTO
                && quantidadeIngressosEvento < evento.TotalIngressos)
            {
                Ingresso ingresso = ingressosService.Create(id, idUsuario);
                try
                {
                    emailService.EnviarEmailConfirmacaoReserva(usuario.Email, ingresso.Id, evento.NomeEvento, usuario.NomeUsuario);
                } 
                catch (Exception e)
                {
                    logger.LogError(e, "Ocorreu um erro com o envio do e-mail de confirmação de retirada de ingresso para o endereço {}", usuario.Email);
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}