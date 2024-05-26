# Registro de Testes de Software

A fim de verificar se a aplicação atende os requisitos levantados e propostos na especificação do projeto foi elaborado um Plano de Testes de Software, contendo 14 casos de teste. Abaixo seguem os registros dos testes realizados seguindo o Plano de Teste de Software elaborado e proposto previamente:

|       Testes        |                                                              Registro, Login e Perfis de Usuários (RF-003, RNF-003, e RF-004)                                                              |
| :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| CT-01: Registro de novo gestor com dados válidos.   | Sucesso. Foi realizado o cadastro de um novo usuário do tipo gestor sem intercorrências.         |
| CT02: Registro de novo espectador com dados válidos.        | Sucesso. Foi feito o cadastro de novo espectador com dados válidos.  |
| CT03: Login de gestor com credenciais válidas.              | Sucesso. Login de gestor efetuado.                 |
| CT04: Login de espectador com credenciais válidas.        | Sucesso. Login de espectador com crededenciais válidas realizado.   |                                                          
| CT05: Tentativa de login com credenciais inválidas.   | Sucesso. Aplicação não permetiu o login com credenciais inválidas. Foi exibido um alerta para o usuário informando-o sobre a necessidade de inserir credenciais corretas.
| CT06: Exibição de perfil de gestores de eventos e espectadores.     | Sucesso. Após efetuado o login com credenciais válidas, foi possível visualizar o perfil de gestores de eventos e espectadores.  |
                                                                                                                                                                    
|       Testes        |                                                              Navegação e Visualização de Eventos (RF-001 e RF-002)                                                              |
| :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| CT07: Exibição da página inicial.  | Sucesso. Assim que o usuário loga no aplicativo a tela inicial/principal é exibida.          |
| CT08: Exibição dos próximos 3 eventos na tela principal        | Sucesso. Os próximos três eventos podem ser visualizados na tela principal.  |
| CT09: Pesquisa de evento pelo nome.              | Sucesso. Na parte superior há uma barra de pesquisa que possibilita a busca de eventos pelo nome.                 |

|       Testes        |                                                              Cadastro e Gerenciamento de Eventos (RF-005 e RF-007)                                                              |
| :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| CT10: Cadastro de novo evento pelo gestor com informações válidas.  | Sucesso. Foi possível cadastrar novo evento por um usuário do tipo gestor, informando o nome, data do evento e quantidade de ingressos disponíveis.          |
| CT11: Gerenciamento do evento pelo gestor.        | Sucesso. Um usuário com permissão de gestor consegue (por meio da aplicação) criar, editar, visualizar detalhes e excluir um evento.  |
| CT12: Verificação das informações do evento cadastrado.              | Sucesso. A aplicação permite que o gestor visualize as informações relevantes do evento cadastrado.                |

|       Testes        |                                                              Gerenciamento de Ingressos (RF-008 e RF-009)                                                              |
| :-----------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------: |
| CT13: Gerenciamento dos ingressos retirados pelo espectador.  | Sucesso. A aplicação permite ao espectador o gerenciamento dos ingressos retirados por ele.          |
| CT14: Confirmação de reserva enviada por e-mail para o espectador.        | Sucesso. Um e-mail com a confirmação da reserva é "disparado" para o espectador após a reserva.  |

<h2>Relatório de Teste de Software</h2>

Os testes realizados nas funcionalidades desenvolvidas apresentaram resultados satisfatórios, uma vez que não foram observados quaisquer erros durante a execução do software. Dessa forma, os testes validam que a aplicação atende aos requisitos propostos na especificação do projeto.
