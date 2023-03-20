# Please read the READ.me files in [backend], [frontend] dirs

Used Node.js and Express.js to create the REST API.
Used MongoDB to store the gateway and peripheral device information.
Used Mongoose to create models and schemas for gateway and peripheral device.
Used Joi to validate input fields.
Frontend:

Use Vuejs to create a basic UI for displaying and manipulating the gateway and peripheral device data.
Testing:
Use Jest for unit testing of the backend API.

# There are tow ways to run this app 

default ports => 
> 5000 for backend
> 3000 for frontend
> 27017 for mongodb

**1- As normal Nodejs App (Local)**
# Gateways API
Please check https://documenter.getpostman.com/view/5236070/2s93JzN1hj file for API document.

## Backend App

Please use following commands to run project.

> Please run these commands inside backend folder since we need to run our backend project
> Please make sure that you have mongodb up and running in your divce.

```bash
# copy and set the environment variables
$ cp .env.example .env

# install dependencies
$ npm run install

# serve with hot reload at localhost:5000
$ npm run dev

# build for production and launch server
$ npm run start

# To run tests
$ npm run test

# To run scripts to import test data (seeds)
$ npm run seed

```

Once the app is up and running, you can access the backend APIs at http://localhost:5000/api/v1/.



## Frontend App

Please use following commands to run project.

> Please run these commands inside backend folder since we need to run our frontend project

```bash
# copy and set the environment variables
$ cp .env.example .env

# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

```

Once the app is up and running, you can access the frontend at http://localhost:3000.


**2- Docker containers**
# Docker development configuration for Gateway Backend and Frontend

> Please make sure that you have docker up and running 
https://docs.docker.com/


**1- Defualt APIs  URL => http://127.0.0.1:5000/api/v1/**

**2- Defualt Frontend [UI] URL => http://127.0.0.1:3000/**



**Envorments Files**
copy and rename the following files to .env

```$ frontend/.env.example```
```$ backend/.env.example```

Setup a local development environment with Docker. 


> Please note that this setup is tested only with macOS, you might run into unexpected behaviour when running this on other platform.


## Docker
Docker compose documentation is available on [Docker's website](https://docs.docker.com/compose/).

### Useful Docker commands
commands to run the backend, frontend and monogodb in docker:

**Re-build the containers**

```docker-compose up -d --build```


**Stop the Docker containers**

```$ docker-compose down```


**Run shell in a container (SSH into container)**

```docker exec -it [container-name] /bin/bash```


## Automation and deployment tool is gitlab ci
Gitlab ci documentation is available on [gitlab's website](https://docs.gitlab.com/ee/ci/index.html).

```$ please configur .gitlab-ci.yml file in backend and frontend dirs```



## Conclusion
This solution provides a simple yet effective way to manage gateways and their associated devices. By using Node.js and MongoDB, we can easily store and retrieve information about gateways and their devices. Additionally, by using Joi, we can validate user input to ensure that the data is accurate and valid. The frontend provides a basic UI for displaying and manipulating the data, while the backend provides a REST API for programmatic access. Overall, this solution is robust, scalable,