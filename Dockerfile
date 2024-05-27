FROM node:18.12

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

CMD ["pnpm","run","dev"]
