# Creating a Dockerfile for a nodejs and redis application

# Pulling the base image
FROM node:alpine

# Creating a working directory
RUN mkdir -p /usr/src/app

# Setting the working directory
WORKDIR /usr/src/app

# Copying the package.json file
COPY package.json /usr/src/app

# Installing the dependencies
RUN npm install

# Copying the rest of the files
COPY ./ /usr/src/app

# Running the command
CMD ["npm", "start"]

# Building the image
# docker build -t docker-nodejs-redis .

# Running the container
# docker run docker-nodejs-redis