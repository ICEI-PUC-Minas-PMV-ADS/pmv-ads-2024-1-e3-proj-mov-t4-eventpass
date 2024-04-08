using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using System;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Configuration;


namespace EventPass.Services
{
    public class EmailService
    {
        private readonly string _remetente;
        private readonly string _emailRemetente;
        private readonly string _senhaEmail;
        private readonly string _servidorSmtp;
        private readonly int _portaSmtp;
        private readonly IConfiguration Configuration;

        public EmailService(IConfiguration configuration)
        {
            Configuration = configuration;
            _remetente = Configuration["MailSettings:Sender:Name"];
            _emailRemetente = Configuration["MailSettings:Sender:Email"];
            _senhaEmail = Configuration["MailSettings:Sender:Password"];
            _servidorSmtp = Configuration["MailSettings:SmtpServer"];
            _portaSmtp = int.Parse(Configuration["MailSettings:Port"]);
        }

        public void EnviarEmailConfirmacaoReserva(string destinatario, int? idIngresso, string nomeEvento, string nomeUsuario)
        {
            var mensagem = new MimeMessage();
            mensagem.From.Add(new MailboxAddress(_remetente, _emailRemetente));
            mensagem.To.Add(new MailboxAddress(nomeUsuario, destinatario));
            mensagem.Subject = "Ingresso reservado com sucesso!";

            var corpoMensagem = new BodyBuilder();
            corpoMensagem.HtmlBody = $@"
            <h1>Olá {nomeUsuario},</h1>
            <p>Seu ingresso de número {idIngresso} para o evento {nomeEvento} foi resgatado com sucesso. Nos vemos em breve e obrigado por escolher o Event Pass!</p>";

            mensagem.Body = corpoMensagem.ToMessageBody();

            SendEmail(mensagem);
        }

        public void EnviarEmailRecuperarLogin(string destinatario, string nomeUsuario)
        {
            var mensagem = new MimeMessage();
            mensagem.From.Add(new MailboxAddress(_remetente, _emailRemetente));
            mensagem.To.Add(new MailboxAddress(nomeUsuario, destinatario));
            mensagem.Subject = "Recuperação de login";

            var corpoMensagem = new BodyBuilder();
            corpoMensagem.HtmlBody = $@"
            <h1>Olá {nomeUsuario},</h1>
            <p>Parece que perdeu seu login?</p>";

            mensagem.Body = corpoMensagem.ToMessageBody();

            SendEmail(mensagem);
        }

        public async Task SendEmailAsync(string toEmail, string subject, string body)
        {
            using (var client = new System.Net.Mail.SmtpClient(_servidorSmtp, _portaSmtp))
            {
                client.UseDefaultCredentials = false;
                client.Credentials = new NetworkCredential(_emailRemetente, _senhaEmail);
                client.EnableSsl = true;

                var message = new MailMessage
                {
                    From = new MailAddress(_emailRemetente, _remetente),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };

                message.To.Add(toEmail);

                await client.SendMailAsync(message);
            }
        }


        private void SendEmail(MimeMessage mensagem)
        {
            using (var clienteSmtp = new MailKit.Net.Smtp.SmtpClient())
            {
                clienteSmtp.Connect(_servidorSmtp, _portaSmtp, SecureSocketOptions.StartTls);
                clienteSmtp.Authenticate(_emailRemetente, _senhaEmail);
                clienteSmtp.Send(mensagem);
                clienteSmtp.Disconnect(true);
            }
        }
    }

}