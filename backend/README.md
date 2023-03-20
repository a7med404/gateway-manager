# Gateways API
Please check https://documenter.getpostman.com/view/5236070/2s93JzN1hj for API documentation and examples.

## Build Setup

Please use following commands to run project.


```bash
# copy and set the environment variables
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

Once the containers are up and running, you can access the frontend at http://localhost:5000.