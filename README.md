# Please read the READ.me files in [backend], [frontend] dirs

# There are tow ways to run this app 

**1- As normal Nodejs App (Local)**

**2- Docker containers**
# Docker development configuration for Gateway Backend and Frontend

default ports => 
> SERVER_PORT=5000 for backend
> NUXT_PORT=3000 for frontend


**1- Defualt Swagger APIs Documention URL => http://127.0.0.1:5000/api/**

**2- Defualt Frontend [UI] URL => http://127.0.0.1:3000/**



**Envorments Files**
rename the following files to .env

```$ frontend/.env.example```
```$ backend/.env.example```
```$ frontend/.env.example```

Setup a local development environment with Docker. 

Make sure to have Docker installed and point *\*.test* hostnames to localhost.

> Please note that this setup is tested only with macOS, you might run into unexpected behaviour when running this on other platform.


## Docker
Docker compose documentation is available on [Docker's website](https://docs.docker.com/compose/).

### Useful Docker commands
Some useful commands are:

**Start the Docker containers**

```$ docker-compose up -d```


**Re-build the containers**

```docker-compose up -d --build```


**Stop the Docker containers**

```$ docker-compose down```


**Show Docker processes**

```docker ps```


**Show running containers**

```docker container ls```


**Run shell in a container (SSH into container)**

```docker exec -it [container-name] /bin/bash```


**Show disk usage for all Docker containers**

```$ docker system df -v```


**Remove unused Docker containers**

```$ docker system prune -a```


## Automation and deployment tool is gitlab ci
Gitlab ci documentation is available on [gitlab's website](https://docs.gitlab.com/ee/ci/index.html).

```$ please configur .gitlab-ci.yml file in backend and frontend dirs```

gateways

![Alt text](/gateways.png?raw=true "Title")

One gateway
![Alt text](/gateway.png?raw=true "Title")

Add gateway
![Alt text](/add-gateway.png?raw=true "Title")