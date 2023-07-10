import * as storage from '@pulumi/azure-native/storage';
import { StorageAccount } from '@pulumi/azure-native/storage';

export function createAzureStorage(name: string, resourceGroupName: string): StorageAccount {
  const storageAccount = new storage.StorageAccount(name, {
    resourceGroupName: resourceGroupName,
    sku: {
      name: storage.SkuName.Standard_LRS,
    },
    kind: storage.Kind.StorageV2,
  });

  return storageAccount;
}
