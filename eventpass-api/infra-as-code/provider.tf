terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.104.2"
    }
    random = {
      source  = "hashicorp/random"
      version = "3.6.2"
    }
  }
  required_version = ">= 1.1.0"
}
provider "azurerm" {
  features {}
}
provider "random" {
}