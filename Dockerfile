FROM node:14

RUN mkdir -p /app

WORKDIR /app

COPY ./src /src
COPY nodemon.json ./
COPY package-lock.json ./
COPY package.json ./
COPY tsconfig.json ./
COPY .eslintrc.json ./

RUN npm install

RUN npm run dev