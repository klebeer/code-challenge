import * as azure from '@pulumi/azure-native';

export function createResourceGroup(name: string, location: string): azure.resources.ResourceGroup {
  const resourceGroup = new azure.resources.ResourceGroup(name, {
    resourceGroupName: name,
    location: location,
  });

  return resourceGroup;
}
