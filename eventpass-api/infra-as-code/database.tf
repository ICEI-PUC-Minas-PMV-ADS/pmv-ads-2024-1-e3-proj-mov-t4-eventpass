resource "random_password" "eventpass-admin-password" {
  length  = 32
  special = false
}

resource "azurerm_mssql_server" "eventpass" {
  name                         = "event-pass"
  resource_group_name          = azurerm_resource_group.eventpass.name
  location                     = azurerm_resource_group.eventpass.location
  version                      = "12.0"
  administrator_login          = "EventPass"
  administrator_login_password = random_password.eventpass-admin-password.result
}

resource "azurerm_mssql_database" "eventpass" {
  name                 = "eventpass"
  server_id            = azurerm_mssql_server.eventpass.id
  collation            = "SQL_Latin1_General_CP1_CI_AS"
  max_size_gb          = 2
  storage_account_type = "Local"
  sku_name             = "GP_S_Gen5_1"

  lifecycle {
    prevent_destroy = true
  }
}
