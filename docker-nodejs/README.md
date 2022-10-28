# Docker for Node.js

This is a simple Dockerfile for Node.js. It is based on the official [Node.js Docker image](https://registry.hub.docker.com/_/node/).

## Usage

To build the image, run:

```bash
docker build -t docker-nodejs .
```

To run the image and bind to port 3000:

```bash
docker run -p 3000:3000 docker-nodejs
```

---

## Explanation

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

# Expose the port that the app is
# listening on (3000)
EXPOSE 3000

# Run the app. This will run `node index.js`
# when the container starts.
CMD [ "npm", "start" ]
```

This will create a new image based on the official Node.js image. It will then install the dependencies from `package.json` and copy the source code into the image. Finally, it will expose port 3000 and run `npm start`.
