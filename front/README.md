# Code Challenge Frontend
This project is a react application that consumes the backend API and shows the data in a table.
The default port is 3000, but you can change this by setting the environment variable PORT.


## Prerequisites
* nodejs 16 installed in your machine.

## How to run the application locally
* Clone the repository
* Run `npm install` to install the dependencies
* Run `npm run start` to start the application

You can modify the backend API URL by setting the environment variable REACT_APP_API_URL, by default is https://backend-api.null.ec
## Deployment
This project uses automated deployment using a github action to deploy the application to a Azure Storage Account.
The deployment is triggered when a merge is done to the main branch.

More details, see the github action file: [deploy.yml](../.github/workflows/publish-to-azure.yaml)
