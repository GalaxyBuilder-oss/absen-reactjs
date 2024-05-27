FROM node:18.12

WORKDIR /app

COPY package*.json .
RUN npm install -g pnpm@latest

COPY . .
COPY pnpm-lock.yaml .
RUN pnpm help install


CMD ["pnpm","run","dev"]
