FROM node:16

WORKDIR /usr/app
RUN npm i -g nodemon

COPY package*.json ./
RUN npm i

COPY ./src ./src
COPY ./.env ./.env

EXPOSE 5001

CMD [ "/tini", "--","node" "./src/app.js"]