import { Construct } from "constructs";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";

export class Test extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const resourceGroupName = "rg-cdktf-dv";
    const location = "East US";


    const rg = new ResourceGroup(this, "rg", {
      name: resourceGroupName,
      location: location,
    });

    new StorageAccount(this, "mattstatefiles", {
      resourceGroupName: rg.name,
      accountReplicationType: "LRS",
      accountTier: "Standard",
      accountKind: "StorageV2",
      location: "East US",
      name: "cdktftestran1423"
    });
    
  }
}