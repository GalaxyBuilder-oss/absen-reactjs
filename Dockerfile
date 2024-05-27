FROM node:18.12

WORKDIR /app

COPY package*.json .
RUN npm install

RUN npm install --save-dev gh-pages

COPY . .

RUN npm preview
