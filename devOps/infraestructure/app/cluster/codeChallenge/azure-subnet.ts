import * as azure from '@pulumi/azure-native';
import { Subnet } from '@pulumi/azure-native/network';
import { Output } from '@pulumi/pulumi';

export const createAzureSubnet = (
  name: string,
  resourceGroupName: string,
  vnet: azure.network.VirtualNetwork,
  addressPrefix: string,
): Output<Subnet> => {
  return vnet.name.apply((vnetName) => {
    return new azure.network.Subnet(name, {
      resourceGroupName: resourceGroupName,
      virtualNetworkName: vnetName,
      addressPrefix: addressPrefix,
    });
  });
};
