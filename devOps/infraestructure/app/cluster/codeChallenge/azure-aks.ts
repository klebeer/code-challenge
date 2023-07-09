import * as azure from '@pulumi/azure-native';
import { Output } from '@pulumi/pulumi';

import { VM_SIZE } from './constants';

export const createAzureAKS = (
  name: string,
  resourceGroupName: string,
  location: string,
  dnsPrefix: string,
  nodeCount: number,
  subnet: Output<azure.network.Subnet>,
) => {
  return subnet.id.apply((subnetId) => {
    return new azure.containerservice.ManagedCluster(name, {
      resourceGroupName: resourceGroupName,
      location: location,
      dnsPrefix: dnsPrefix,
      agentPoolProfiles: [
        {
          name: 'aksagentpool',
          count: nodeCount,
          mode: 'System',
          type: 'VirtualMachineScaleSets',
          vmSize: VM_SIZE,
          vnetSubnetID: subnetId,
        },
      ],
      identity: {
        type: 'SystemAssigned',
      },
      enableRBAC: true,
    });
  });
};
