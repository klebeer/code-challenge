import * as azure from '@pulumi/azure-native';

export const createVnet = (
  name: string,
  resourceGroupName: string,
  addressPrefix: string,
  location: string,
): azure.network.VirtualNetwork => {
  return new azure.network.VirtualNetwork(name, {
    resourceGroupName: resourceGroupName,
    location: location,
    addressSpace: {
      addressPrefixes: [addressPrefix],
    },
  });
};
