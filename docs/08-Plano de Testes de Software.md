# Plano de Testes de Software

<span style="color:red">Pré-requisitos: <a href="2-Especificação do Projeto.md"> Especificação do Projeto</a></span>, <a href="3-Projeto de Interface.md"> Projeto de Interface</a>

## 1. Objetivo 

Garantir que o aplicativo móvel EventPass atenda aos requisitos funcionais e não funcionais, fornecendo uma experiência de reserva de ingressos intuitiva e eficiente para os usuários. 

## 2. Escopo

O plano de teste irá comtemplar todas as funcionalidades essenciais do aplicativo, conforme definido nos requisitos funcionais da aplicação. 

## 3. Estratégia de Teste

Os testes serão realizados em diferentes níveis, sendo eles:  
* Testes de unidade para cada componente. 
* Testes de sistema para verificar o funcionamento da aplicação como um todo.

## 4. Casos de Teste

**1. Registro, Login e Perfis de Usuários (RF-003, RNF-003, e RF-004):** 
   * CT01: Registro de novo gestor com dados válidos. 
   * CT02: Registro de novo espectador com dados válidos. 
   * CT03: Login de gestor com credenciais válidas. 
   * CT04: Login de espectador com credenciais válidas. 
   * CT05: Tentativa de login com credenciais inválidas. 
   * CT06: Exibição de perfil de gestores de eventos e espectadores. 

**2. Navegação e Visualização de Eventos (RF-001 e RF-002):** 
   * CT07: Exibição da página inicial. 
   * CT08: Exibição dos próximos 3 eventos na tela principal. 
   * CT09: Pesquisa de evento pelo nome. 

**3. Cadastro e Gerenciamento de Eventos (RF-005 e RF-007):** 
   * CT10: Cadastro de novo evento pelo gestor com informações válidas. 
   * CT11: Gerenciamento do evento pelo gestor. 
   * CT12: Verificação das informações do evento cadastrado. 

**4. Gerenciamento de Ingressos (RF-008 e RF-009):** 
   * CT13: Gerenciamento dos ingressos retirados pelo espectador. 
   * CT14: Confirmação de reserva enviada por e-mail para o espectador. 

## 5. Ambiente de Teste

Os testes serão realizados em dispositivos móveis iOS e Android, utilizando emuladores e dispositivos reais.  

## 6. Critérios de Aceitação

* Todos os casos de teste devem ser executados sem erros. 
* O aplicativo deve ser compatível com diferentes dispositivos e os principais sistemas operacionais móveis, conforme especificado nos requisitos não funcionais. 
* O tempo máximo de processamento das requisições do usuário não deve exceder 10 segundos. 

## 7. Resposabilidades

* **Desenvolvedores:** Responsáveis pela correção de bugs identificados nos testes. 
* **Testadores:** Responsáveis pela execução dos casos de teste e relato de bugs.

## 8. Cronograma

Os testes serão realizados ao longo de uma semana, com revisões dos resultados e correções, conforme necessário. 
