# The Code Challenge Azure AKS Infrastructure as Code

This repository contains the code to deploy a simple Kubernetes cluster on Azure using Pulumi.

## Prerequisites

Before running the Pulumi program, you need to have the following installed and configured:

- An Azure subscription with sufficient permissions to create resources
- Node.js (version 14 or higher)
- Pulumi CLI (version 3.0 or higher)

## Usage

1. Clone the repository to your local machine:

2. Install the dependencies:

```bash
npm install
```

3. Log in to your Azure account:

```bash
pulumi login azure
```

5. Preview the changes:

```bash
pulumi preview
```

6. Deploy the stack:

```bash
pulumi up
```

6. After the deployment is complete, you can retrieve the kubeconfig file for your cluster:

```bash
pulumi stack output kubeconfig > kubeconfig.yaml
```

## Output

The program outputs the following resources:

- Azure Resource Group
- Azure Virtual Network
- Azure Subnet
- Azure Kubernetes Service Cluster
- Kubernetes Config

You can retrieve the output values using the `pulumi stack output` command.

## Clean Up

To remove all the resources created by the Pulumi program, run the following command:

```bash
pulumi destroy
```
