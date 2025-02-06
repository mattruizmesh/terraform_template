module "storage_account" {
  #source = "github.com/mattruizmesh/terraform_module_source/storage"
  source = "git@github.com-mesh:mattruizmesh/terraform_module_source.git//storage"

  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  storage_account_name = "modulestorage"
  storage_account_tier = "Standard"
  storage_account_replication_type = "LRS"
  tags = {
    environment = "dev"
    owner       = "Matt Ruiz"
    project     = "Remote Terraform Modules"
  }
}