import { Construct } from "constructs";
import { StorageAccount } from "@cdktf/provider-azurerm/lib/storage-account";
import { ResourceGroup } from "@cdktf/provider-azurerm/lib/resource-group";
import { Storage } from "../.gen/modules/storage";
import { StorageFromPackage } from "@mattruizmesh/projen_demo_cdktf";

export class Test extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const resourceGroupName = "rg-cdktf-dv";
    const location = "East US";


    const rg = new ResourceGroup(this, "rg", {
      name: resourceGroupName,
      location: location,
    });

    // Vanilla CDKTF resource
    new StorageAccount(this, "mattstatefiles", {
      resourceGroupName: rg.name,
      accountReplicationType: "LRS",
      accountTier: "Standard",
      accountKind: "StorageV2",
      location: "East US",
      name: "cdktftestran1423"
    });
    
    // Done using a remote module defined in HCL
    new Storage(this, "storage", {
      resourceGroupName: rg.name,
      location: rg.location,
      storageAccountName: "stmodulestrg893",
      storageAccountReplicationType: "LRS",
      storageAccountTier: "Standard",
      tags: {
        environment: "dev",
        owner: "it",
        project: "cdktf testing"
      }
    });

    new StorageFromPackage(this, "stgfrmpckg12399", rg.location, rg.name);
  }
}