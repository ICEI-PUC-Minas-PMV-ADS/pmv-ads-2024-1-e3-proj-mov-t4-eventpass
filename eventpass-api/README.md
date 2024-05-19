# EventPass API

## Referências

### API
A API foi construída utilizando [este tutorial](https://learn.microsoft.com/en-us/aspnet/core/tutorials/min-web-api?view=aspnetcore-8.0&tabs=visual-studio-code) da Microsoft como referência.

### Configuração do Entity Framework
https://medium.com/@lucas.and227/step-by-step-guide-to-entity-framework-in-net-c629faf9f322

## Deployment

### Plugin Azure Tools no Visual Studio Code

1. Baixar e instalar o plugin [Azure Tools](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)
1. Fazer login com a conta da Azure no plugin
1. Abrir o App Service e localizar o serviço chamado eventpass-api
1. Clicar com o botão direito no serviço chamado eventpass-api
1. Clicar em Deploy to Web App...
1. A API estará disponível em https://eventpass-api.azurewebsites.net/

### Continuous Deployment
TODO


## Configurações do ambiente

```
dotnet restore
dotnet ef database update
dotnet run --environment Development
```