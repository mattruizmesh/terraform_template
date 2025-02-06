module "storage_account" {
  # Using a tagged release form github
  source = "github.com/mattruizmesh/terraform_module_source.git//storage?ref=test"
  
  # This should work for a public repository
  # source = "github.com/mattruizmesh/terraform_module_source.git//storage"

  # This is using my local rsa key
  #source = "git@github.com-mesh:mattruizmesh/terraform_module_source.git//storage"

  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  storage_account_name = "modulestoragerannums129"
  storage_account_tier = "Standard"
  storage_account_replication_type = "LRS"
  tags = {
    environment = "dev"
    owner       = "Matt Ruiz"
    project     = "Remote Terraform Modules"
  }
}