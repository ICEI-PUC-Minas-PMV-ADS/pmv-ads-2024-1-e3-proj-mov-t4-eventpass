resource "azurerm_storage_account" "eventpassstorage" {
  name                             = "eventpassstorage"
  resource_group_name              = azurerm_resource_group.eventpass.name
  location                         = azurerm_resource_group.eventpass.location
  account_tier                     = "Standard"
  account_replication_type         = "LRS"
  cross_tenant_replication_enabled = false
}

resource "azurerm_storage_container" "images" {
  name                  = "images"
  storage_account_name  = azurerm_storage_account.eventpassstorage.name
  container_access_type = "blob"

  lifecycle {
    prevent_destroy = true
  }
}
