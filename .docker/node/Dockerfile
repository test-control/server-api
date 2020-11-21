FROM node:14

WORKDIR /srv/backend-app

COPY ./db db
COPY ./specs specs
COPY ./src src
COPY ./nodemon.json nodemon.json
COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
COPY ./tsconfig.json tsconfig.json
COPY ./entrypoint.sh entrypoint.sh

RUN chmod +x /srv/backend-app/entrypoint.sh

RUN npm install

EXPOSE 3000

ENTRYPOINT ["sh", "/srv/backend-app/entrypoint.sh"]