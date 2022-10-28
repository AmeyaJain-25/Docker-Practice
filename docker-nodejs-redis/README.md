# Docker for Node.js and Redis using docker-compose

This is a simple Dockerfile for Node.js and Redis. It is based on the official [Node.js Docker image](https://registry.hub.docker.com/_/node/) and [Redis Docker image](https://registry.hub.docker.com/_/redis/).

## Usage

### Running nodejs app using Dockerfile

To build the image, run:

```bash
docker build -t docker-nodejs-redis .
```

To run the image and bind to port 3000:

```bash
docker run -p 3000:3000 docker-nodejs-redis
```

`NOTE`: This will not run redis server. You need to run redis server separately.

### Running nodejs app using docker-compose

To run the image and bind to port 3000:

```bash
docker-compose up
```

To stop the image:

```bash
docker-compose down
```

To run the image with new changes in Dockerfile:

```bash
docker-compose up --build
```

To stop the image and remove the volumes:

```bash
docker-compose down -v
```

`NOTE`: This will run redis server as well.

---

## Explanation

### Dockerfile

Create a `Dockerfile` with the following contents:

```Dockerfile
# Use the official image as a parent image.
# We are using node:alpine due to its small size.
FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
# Set the working directory to /usr/src/app
WORKDIR /usr/src/app

# Copying package.json separately from the rest of
# the code allows Docker to cache the npm install step,
# which is a time consuming step.
COPY package.json /usr/src/app/

# Install app dependencies
RUN npm install

# Bundle app source. This will copy all the files
# in the current directory to the container.
COPY . /usr/src/app

# Run the app. This will run `node index.js`
# when the container starts.
CMD [ "npm", "start" ]
```

### docker-compose.yml

Create a `docker-compose.yml` with the following contents:

```yaml
# Version of docker-compose file
version: '3.9'

# Define services
services:
# Define redis service
redis-server:
  # Restart policy. Always restart the
  # container if it stops.
  restart: always
  # Use the official image as a parent image.
  image: 'redis:latest'
  # Set volumes for redis data.
  volumes:
    # This will create a volume named redis-data
    # and mount it to /data directory
    # so that the data is persisted even if the
    # container is stopped.
    - redis-data:/data
    # Port mapping
  ports:
    # This will map port 6379 of the container
    # to port 6379 of the host.
    - '6379:6379'
# Nodejs app service
node-app:
  # Build the image using Dockerfile.
  build: .
  # Port mapping.
  ports:
    # This will map port 3000 of the
    # container to port 4001 of the host.
    - '4001:3000'
    # Volume mapping
  volumes:
    # This will map the current directory
    # to /app directory in the container.
    # This will allow us to make changes
    # to the code and see the changes
    # immediately.
    - .:/app
    - /app/node_modules
  depends_on:
    # This will make sure that redis
    # service is started before nodejs
    # app service.
    - redis-server

# Define volumes
volumes:
# This will create a volume named redis-data
redis-data:
```

This will create two services:

1. redis-server
2. node-app

The `redis-server` service will run the official Redis image and the `node-app` service will run the image built using the `Dockerfile`.
