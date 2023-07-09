import { createAzureAKS } from './app/cluster/codeChallenge/azure-aks';
import { createResourceGroup } from './app/cluster/codeChallenge/azure-resource-group';
import { createAzureSubnet } from './app/cluster/codeChallenge/azure-subnet';
import { createVnet } from './app/cluster/codeChallenge/azure-vnet';
import {
  AKS_ADDRESSES_SUBNET,
  AKS_DNS_PREFIX,
  AKS_NAME,
  AKS_NODE_COUNT,
  LOCATION,
  RESOURCE_GROUP_NAME,
  SUBNET_NAME,
  VNET_ADDRESS_PREFIX,
  VNET_NAME,
} from './app/cluster/codeChallenge/constants';
import { logger } from './app/utils/logger';

const resourceGroup = createResourceGroup(RESOURCE_GROUP_NAME, LOCATION);
resourceGroup.name.apply((name) => {
  logger.info(`resourceGroup created ${name}`);
  const codeChallengeVnet = createVnet(VNET_NAME, RESOURCE_GROUP_NAME, VNET_ADDRESS_PREFIX, LOCATION);
  codeChallengeVnet.id.apply((id) => logger.info(`codeChallengeVnet created ${id}`));
  const aksSubNet = createAzureSubnet(SUBNET_NAME, RESOURCE_GROUP_NAME, codeChallengeVnet, AKS_ADDRESSES_SUBNET);

  aksSubNet.id.apply((id) => logger.info(`codeChallengeVnet aksSubNet created ${id}`));

  const aks = createAzureAKS(AKS_NAME, RESOURCE_GROUP_NAME, LOCATION, AKS_DNS_PREFIX, AKS_NODE_COUNT, aksSubNet);
  aks.id.apply((id) => logger.info(`codeChallengeVnet aks created ${id}`));
});
