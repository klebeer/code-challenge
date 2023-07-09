# Flux Deployment

## Description

This repo contains a simple deployment of fluxCD to deploy the code challenge images to a kubernetes cluster.

### Prerequisites

* [fluxcd](https://fluxcd.io/flux/installation/)
* [kustomize](https://kustomize.io/)
* [kubectl](https://kubernetes.io/docs/tasks/tools/install-kubectl/)
* An Kubernetes cluster
* A GitHub repository named flux-deployment
* A Personal Access Token with read packages permissions

You need to be **logged in to the cluster** before running the following commands.

#### Install fluxCd
create the pull secret for the fluxcd repository
```bash
kubectl create secret docker-registry pullsecret --docker-server=https://ghcr.io --docker-username=notneeded --docker-password=GPAT
```

```bash
 flux bootstrap github \
    --components-extra=image-reflector-controller,image-automation-controller \
    --owner=klebeer \
    --repository=code-challenge \
    --branch=main \
    --path=devOps/flux/clusters/dev \
    --read-write-key 
```
