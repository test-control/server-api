FROM node:14

WORKDIR /srv/backend-app-tests

COPY ./src src
COPY ./.mocharc.json .mocharc.json
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json

RUN npm install
