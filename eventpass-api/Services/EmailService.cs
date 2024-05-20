using System.Net.Mail;
using System.Net;

namespace EventPass.Services
{
    public class EmailService
    {
        private readonly string _remetente;
        private readonly string _emailRemetente;
        private readonly string _senhaEmail;
        private readonly string _servidorSmtp;
        private readonly int _portaSmtp;

        public EmailService(IConfiguration Configuration)
        {
            _remetente = Configuration["MailSettings:Sender:Name"];
            _emailRemetente = Configuration["MailSettings:Sender:Email"];
            _senhaEmail = Configuration["MailSettings:Sender:Password"];
            _servidorSmtp = Configuration["MailSettings:SmtpServer"];
            _portaSmtp = int.Parse(Configuration["MailSettings:Port"]);
        }

        public void EnviarEmailConfirmacaoReserva(string destinatario, int idIngresso, string nomeEvento, string nomeUsuario)
        {
            var corpoMensagem = $@"
            <h1>Olá {nomeUsuario},</h1>
            <p>Seu ingresso de número {idIngresso} para o evento {nomeEvento} foi resgatado com sucesso. Nos vemos em breve e obrigado por escolher o Event Pass!</p>";

            SendEmail(destinatario, "Ingresso reservado com sucesso!", corpoMensagem);
        }

        public void EnviarEmailRecuperarLogin(string destinatario, string nomeUsuario)
        {
            var corpoMensagem = $@"
            <h1>Olá {nomeUsuario},</h1>
            <p>Parece que perdeu seu login?</p>";

            SendEmail(destinatario, "Recuperação de login", corpoMensagem);
        }

        public void SendEmail(string toEmail, string subject, string body)
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

                client.Send(message);
            }
        }
    }

}