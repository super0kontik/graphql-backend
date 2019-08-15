FROM node:8.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

EXPOSE 8000

CMD [ "node", "app.js" ]
