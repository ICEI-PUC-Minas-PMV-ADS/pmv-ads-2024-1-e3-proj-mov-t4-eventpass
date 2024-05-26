# Programação de Funcionalidades

Durante a etapa de desenvolvimento, os artefatos de software foram elaborados com base nos requisitos funcionais.

A tabela a seguir estabelece a correlação entre o artefato produzido e o respectivo requisito funcional.

| ID     | Descrição do Requisito                                                                                                                                     | Artefato produzido                                                                                        |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| RF-001 | A aplicação deve exibir uma página inicial.                                                                                                      | \Views\Home\Index-Privacy.cshtml, \Views\Home\Privacy.cshtml, View\src\pages\homePage.js                                    |
| RF-002 | A aplicação deve exibir os próximos 3 eventos na tela principal.                                                                                          | \Views\Home\Index.cshtml, View\src\pages\homePage.js                                                |
| RF-003 | A aplicação deve permitir o cadastro de gestores e espectadores.                                                                                           | \Controllers\UsuariosController.cs, \Views\Usuarios\Create-Index.cshtml, \View\src\pages\profile.js                       |
| RF-004 | A aplicação deve conter perfis de gestor de eventos e espectador.                                                                                        | \Controllers\UsuariosController.cs, \Views\Usuarios\Details.cshtml, \View\src\pages\profile.js                                           |
| RF-005 | A aplicação deve permitir o gerenciamento do evento pelo gestor.                                                                                           | \Controllers\EventosController.cs, \Views\Eventos\Create-Delete-Details-Edit.cshtml                                                                                  |
| RF-006 | A aplicação deve permitir o espectador pesquisar o evento pelo nome.   | \View\src\pages\buscar.js, \Controllers\EventosController.cs, Views\Eventos\Buscar.cshtml                                     |
| RF-007 | A aplicação deve garantir que ao cadastrar o evento, o gestor informe a atração, o local, a data e a quantidade de ingressos disponíveis.                                                                         | \Controllers\EventosController.cs, \Models\Evento.cs, \Views\Eventos\Create.cshtml |
| RF-008 | A aplicação deve permitir o gerenciamento dos ingressos retirados pelo espectador.                                                                             | \Controllers\IngressosController.cs                     |
| RF-009 | A aplicação deve enviar um e-mail de confirmação de reserva para o espectador.  | \Services\EmailService.cs                                        |
| RF-010 | A aplicação deve possibilitar ao gestor do evento gerar relatório geral do evento com dados do eventos, ingressos disponíveis e ingressos já distribuídos.  | \Controllers\EventosController.cs, \Views\Eventos\Relatorio.cshtml                                        |
| RF-011 | A aplicação deve possibilitar ao gestor do evento e espectador a redefinição de senha.  | \Views\Usuarios\EsqueciSenha.cshtml, \Views\Usuarios\RedefinirSenha.cshtml, \Controllers\UsuariosController.cs |
