FROM node:14

WORKDIR /usr/src/app

RUN npm i -g nodemon

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030
CMD [ "npm", "start", "--production" ]
