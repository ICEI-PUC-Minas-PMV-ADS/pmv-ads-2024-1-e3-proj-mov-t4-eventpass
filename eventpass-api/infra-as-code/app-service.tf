resource "random_password" "eventpass-app-jwt-secret" {
  length  = 32
  special = false
}

resource "azurerm_service_plan" "eventpass-service-plan" {
  name                = "ASP-eventpass-8f2a"
  location            = azurerm_resource_group.eventpass.location
  resource_group_name = azurerm_resource_group.eventpass.name
  os_type             = "Linux"
  sku_name            = "B1"
}

resource "azurerm_linux_web_app" "eventpass-app-service" {
  name                                           = "eventpassapi"
  location                                       = azurerm_resource_group.eventpass.location
  resource_group_name                            = azurerm_resource_group.eventpass.name
  service_plan_id                                = azurerm_service_plan.eventpass-service-plan.id
  https_only                                     = true
  webdeploy_publish_basic_authentication_enabled = false
  ftp_publish_basic_authentication_enabled       = false

  site_config {
    always_on                         = false
    ftps_state                        = "FtpsOnly"
    health_check_path                 = "/health"
    ip_restriction_default_action     = "Allow"
    scm_ip_restriction_default_action = "Allow"
  }

  app_settings = {
    "ApplicationSettings__JwtSecret" = random_password.eventpass-app-jwt-secret.result
    "MailSettings__Sender__Password" = "Eventp@ss13579"
  }

  connection_string {
    name  = "EventPassDatabase"
    type  = "SQLServer"
    value = "Server=tcp:${azurerm_mssql_server.eventpass.fully_qualified_domain_name},1433;Initial Catalog=${azurerm_mssql_database.eventpass.name};Persist Security Info=False;User ID=${azurerm_mssql_server.eventpass.administrator_login};Password=${azurerm_mssql_server.eventpass.administrator_login_password};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
  }

  connection_string {
    name  = "ImageStorageAccountConnection"
    type  = "Custom"
    value = azurerm_storage_account.eventpassstorage.secondary_connection_string
  }

}
