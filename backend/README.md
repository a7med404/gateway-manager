Gateways
==

# Gateways API
Please check `docs/api-v1.yml` file for API document.

## Development

Please use following commands to run project.

```bash
$ cp .env.example .env
$ npm install
$ npm run api:dev
```


Once the containers are up and running, you can access the frontend at http://localhost:3000 and the backend APIs at http://localhost:8080/api/.

Please use following commands to run project in docker environment.

```bash
$ docker build -t op-bff .
$ docker run -p 5000:5000 -t --env-file .env op-bff
```










Solution:

For this project, I would use the following technologies:

Node.js with Express framework for building the REST API
MongoDB for data storage
Angular for the front-end UI
Jest for unit testing
Docker for containerization
Here are the steps to implement the solution:

Install Node.js and MongoDB on the system.
Create a new Node.js project and initialize it using npm.
Install the necessary dependencies: express, mongoose, body-parser, cors, helmet, and Jest.
Set up the MongoDB connection using Mongoose.
Create a Gateway model with the required fields (serial number, name, IP address, and devices).
Create a Peripheral Device model with the required fields (UID, vendor, date created, and status).
Implement validation for the IP address field using a regular expression.
Implement validation for the number of peripheral devices associated with a gateway.
Create the necessary endpoints for the REST API: create, read, update, and delete for gateways and devices.
Implement the necessary front-end components using Angular.
Create a basic UI with the ability to view all stored gateways and their devices and to add or remove devices from a gateway.
Write meaningful unit tests for the REST API endpoints using Jest.
Set up a Dockerfile and docker-compose.yml file for containerization.
Write a README file with installation and usage instructions.
The project files can be packaged and sent to Musala Soft for review along with any necessary SQL scripts to import test data or other scripts needed for running the project.








The following are the endpoints of the backend API:

GET /api/gateways - gets all gateways and their peripheral devices.
GET /api/gateways/:id - gets a single gateway and its peripheral devices by its ID.
POST /api/gateways - adds a new gateway with the given information.
PUT /api/gateways/:id - updates an existing gateway with the given information.
DELETE /api/gateways/:id - deletes a gateway with the given ID.
POST /api/gateways/:id/devices - adds a new peripheral device to the gateway with the given ID.
DELETE /api/gateways/:id/devices/:uid - deletes a peripheral device with the given UID from the gateway with the given ID.








Backend:

Use Node.js and Express.js to create the REST API.
Use MongoDB to store the gateway and peripheral device information.
Use Mongoose to create models and schemas for gateway and peripheral device.
Use Joi to validate input fields.
Frontend:

Use Angular or React to create a basic UI for displaying and manipulating the gateway and peripheral device data.
Testing:

Use Jest or Mocha for unit testing of the backend API.
Use Cypress or Jest for frontend testing.
Readme file:

Provide instructions on how to install and run the project.
Explain the API endpoints and their functionality.
Provide instructions on how to run the unit and integration tests.
Automated build:

Use Jenkins, Travis CI, or another CI/CD tool to automate the build and deployment process.
API Endpoints:

GET /api/gateways
Returns a list of all gateways and their associated devices.
POST /api/gateways
Creates a new gateway and adds it to the database.
Fields:
serialNumber (required)
name (required)
ipv4Address (required, validated)
GET /api/gateways/:serialNumber
Returns information about a single gateway and its associated devices.
PUT /api/gateways/:serialNumber
Updates information about a gateway.
Fields:
name
ipv4Address (validated)
DELETE /api/gateways/:serialNumber
Deletes a gateway and its associated devices.
POST /api/gateways/:serialNumber/devices
Adds a new peripheral device to a gateway.
Fields:
uid (required)
vendor (required)
createdDate
status (online/offline)
DELETE /api/gateways/:serialNumber/devices/:uid
Deletes a peripheral device from a gateway.
Example Request:

POST /api/gateways

{
"serialNumber": "GATEWAY001",
"name": "Main Gateway",
"ipv4Address": "192.168.1.1"
}

Example Response:

{
"serialNumber": "GATEWAY001",
"name": "Main Gateway",
"ipv4Address": "192.168.1.1",
"devices": []
}

Example Request:

POST /api/gateways/GATEWAY001/devices

{
"uid": 1234,
"vendor": "ACME Inc.",
"createdDate": "2022-01-01",
"status": "online"
}

Example Response:

{
"serialNumber": "GATEWAY001",
"name": "Main Gateway",
"ipv4Address": "192.168.1.1",
"devices": [
{
"uid": 1234,
"vendor": "ACME Inc.",
"createdDate": "2022-01-01",
"status": "online"
}
]
}

Conclusion:

This solution provides a simple yet effective way to manage gateways and their associated devices. By using Node.js and MongoDB, we can easily store and retrieve information about gateways and their devices. Additionally, by using Joi, we can validate user input to ensure that the data is accurate and valid. The frontend provides a basic UI for displaying and manipulating the data, while the backend provides a REST API for programmatic access. Overall, this solution is robust, scalable,