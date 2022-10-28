# Docker for Redis

This is a simple Dockerfile for Redis. It is based on the official [Redis Docker image](https://registry.hub.docker.com/_/redis/).

## Usage

To build the image, run:

```bash
docker build -t docker-redis .
```

To run the image and bind to port 6379:

```bash
docker run -p 6379:6379 docker-redis
```
