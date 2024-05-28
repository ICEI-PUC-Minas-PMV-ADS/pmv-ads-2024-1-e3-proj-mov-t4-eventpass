# EventPass : Infrastructure as Code

## Requisitos
Azure CLI 2.61.0
Terraform v1.8.4

## Como utilizar

### Configuração inicial
Rodar o comando abaixo para se autenticar no Azure CLI. O comando irá abrir o browser onde você deverá informar as credencias para acesso na conta da Azure.

```shell
az login
```

Na sequência deve-se inicializar o terraform.
```shell
terraform init
```

### Aplicar infra

Rodar o comando abaixo para visualizar quais alterações terão efeito no servidor. 
```shell
terraform plan
```

Após conferir que está tudo certo, rodar o comando abaixo para aplicar as mudanças no servidor
```shell
terraform apply
```

## Script para importação dos recursos existentes

```shell
terraform import azurerm_resource_group.eventpass /subscriptions/d608f441-91ce-42c3-bdc2-585bb4099d4b/resourceGroups/eventpass
terraform import azurerm_service_plan.eventpass-service-plan /subscriptions/d608f441-91ce-42c3-bdc2-585bb4099d4b/resourceGroups/eventpass/providers/Microsoft.Web/serverFarms/ASP-eventpass-8f2a
terraform import azurerm_linux_web_app.eventpass-app-service /subscriptions/d608f441-91ce-42c3-bdc2-585bb4099d4b/resourceGroups/eventpass/providers/Microsoft.Web/sites/eventpassapi
terraform import azurerm_storage_account.eventpassstorage /subscriptions/d608f441-91ce-42c3-bdc2-585bb4099d4b/resourceGroups/eventpass/providers/Microsoft.Storage/storageAccounts/eventpassstorage
terraform import azurerm_storage_container.images https://eventpassstorage.blob.core.windows.net/images
terraform import azurerm_mssql_server.eventpass /subscriptions/d608f441-91ce-42c3-bdc2-585bb4099d4b/resourceGroups/eventpass/providers/Microsoft.Sql/servers/event-pass
terraform import azurerm_mssql_database.eventpass /subscriptions/d608f441-91ce-42c3-bdc2-585bb4099d4b/resourceGroups/eventpass/providers/Microsoft.Sql/servers/event-pass/databases/eventpass
```