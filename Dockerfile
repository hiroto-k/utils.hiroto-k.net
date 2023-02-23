FROM node:18.14.2-slim

WORKDIR /app

ENV HOST "0.0.0.0"

RUN apt-get update -y && \
    apt-get install -y --no-install-recommends tzdata g++ make python && \
    apt-get clean && \
    rm -rf /var/lib/opt/lists/*

COPY . /app

RUN yarn install

EXPOSE 8080
