import * as dotenv from 'dotenv';
dotenv.config();

import { Construct } from "constructs";
import { App, TerraformStack, AzurermBackend} from "cdktf";
import { Test } from "./lib/test";
import { AzurermProvider } from "@cdktf/provider-azurerm/lib/provider";

class TestStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const clientId = process.env["ARM_CLIENT_ID"];
    const clientSecret = process.env["ARM_CLIENT_SECRET"];
    const tenantId = process.env["ARM_TENANT_ID"];
    const subscriptionId = process.env["ARM_SUBSCRIPTION_ID"];

    // define backend
    new AzurermBackend(this, {
      resourceGroupName: "rg-statefiles-dv",
      storageAccountName: "mattstatefiles",
      containerName: "tfstate",
      key: "cdktf.tfstate",
    });

    new AzurermProvider(this, "AzureRm", {
      storageUseAzuread: true,
      features: [{}],
      clientId: clientId,
      clientSecret: clientSecret,
      tenantId: tenantId,
      subscriptionId: subscriptionId
    });

    // define resources here
    new Test(this, "test");
  }
}

const app = new App();
new TestStack(app, "infrastructure_cdktf");
app.synth();
