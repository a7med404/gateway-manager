Gateways
==

# Gateways API
Please check https://documenter.getpostman.com/view/5236070/2s93JzN1hj file for API document.

## Development

Please use following commands to run project.


```bash
# iset
$ cp .env.example .env

# install dependencies
$ npm run install

# serve with hot reload at localhost:5000
$ npm run dev

# build for production and launch server
$ npm run start

# To run scripts to import test data (seeds)
$ npm run seed

```

Once the containers are up and running, you can access the frontend at http://localhost:5000 and the backend APIs at http://localhost:5000/api/v1/.

Please use following commands to run project in docker environment.

```bash
$ docker build -t backend .
$ docker run -p 5000:5000 -t --env-file .env backend
```











Set up a Dockerfile and docker-compose.yml file for containerization.
Write a README file with installation and usage instructions.
The project files can be packaged and sent to Musala Soft for review along with any necessary SQL scripts to import test data or other scripts needed for running the project.









Readme file:

Provide instructions on how to install and run the project.
Explain the API endpoints and their functionality.
Provide instructions on how to run the unit and integration tests.
Automated build:

Use Jenkins, Travis CI, or another CI/CD tool to automate the build and deployment process.
API Endpoints:


Conclusion:

This solution provides a simple yet effective way to manage gateways and their associated devices. By using Node.js and MongoDB, we can easily store and retrieve information about gateways and their devices. Additionally, by using Joi, we can validate user input to ensure that the data is accurate and valid. The frontend provides a basic UI for displaying and manipulating the data, while the backend provides a REST API for programmatic access. Overall, this solution is robust, scalable,