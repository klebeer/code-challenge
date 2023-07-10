# Backend API

This project contains the backend API for the code challenge, is a simple nodejs express application that exposes the following endpoints:
* /health this endpoint checks the health of the application, and also checks if the external dependencies are available.
* /files/list returns a list of the CSV files available in the external service. 
* /files/data returns all the CSV files parsed as a json object.
* /files/data?fileName=fileName returns the data of the file with given the file name.


## Prerequisites
* nodejs 14 installed in your machine.
* Docker and docker-compose (optional) to run locally the application using the docker-compose file.



## How to run the application locally
The application by default is exposed on the port 3000, you can change this by setting the environment variable PORT.
If you need, you can create a copy of the .env.template file and change the environment variables there, but is not needed to run the application.

* Clone the repository
* Run `npm install` to install the dependencies
* Run `npm run start` to start the application

Also, we have other scripts to run the application:
* `npm run start:dev` to start the application in development mode (hot deploy).
* `npm run start:prod` to start the application in production mode.
* `npm run test` to run the unit tests.
* `npm run check-style` to check the eslint compliance and code formatting.

## Run with docker-compose
* Run `docker-compose up` to start the application with docker-compose.


## Deployment
This project uses automated deployment using a github action to deploy the backend to a kubebernetes cluster using fluxCD.
The first step is performed when a merge is done to the main branch, in this point a github action publishes the docker image to the github container registry.
More details, see the github action file: [publish-to-ghcr.yml](../.github/workflows/publish-to-dc.yaml)


## Code Quality
This project uses eslint to check the code quality, you can run the command `npm run check-style` to check the code quality.
Also a Sonar Cloud analysis is performed on a PR to the branches develop and main.
