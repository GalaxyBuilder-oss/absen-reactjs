FROM node:18.12

WORKDIR /app

COPY package*.json .
RUN npm install -g pnpm@latest

COPY pnpm-lock.yaml .
RUN pnpm fetch

COPY . .

CMD ["pnpm","run","dev"]
