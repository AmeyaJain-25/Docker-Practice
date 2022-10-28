# Create a Dockerfile for running a nodejs app

# Use the official nodejs image
FROM node:alpine

# Create a directory for the app
RUN mkdir -p /usr/src/app

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json file
COPY package.json /usr/src/app

# Install the dependencies
RUN npm install

# Copy the app files
COPY . /usr/src/app

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

# Build the image
# docker build -t docker-nodejs .

# Run the image
# docker run -p 3000:3000 docker-nodejs