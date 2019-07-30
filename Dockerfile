FROM node:8.10.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#RUN pwd

#RUN ls

#RUN mkdir -p /usr/src/app/graphql/resolvers

#RUN cd /usr/src/app/graphql && ls

#RUN cd /usr/src/app/graphql/schema && ls

#COPY ./graphql/resolvers  /usr/src/app/graphql/resolvers

#RUN cd graphql && ls

RUN npm install

EXPOSE 8000

CMD [ "npm", "run", "start" ]