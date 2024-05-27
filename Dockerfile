FROM node:18.12

WORKDIR /app

COPY package*.json .
RUN npm install -g pnpm@latest

RUN pnpm install -r --offline
RUN pnpm build

COPY . .

CMD ["pnpm","run","dev"]
