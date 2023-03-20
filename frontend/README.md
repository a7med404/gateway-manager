# Gateways API
Please check https://documenter.getpostman.com/view/5236070/2s93JzN1hj for API documentation and examples.

## Build Setup

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

Please use following commands to run project in docker environment.

```bash
$ docker build -t frontend .
$ docker run -p 3000:3000 -t --env-file .env frontend
```

Once the containers are up and running, you can access the frontend at http://localhost:3000.

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).
