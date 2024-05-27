FROM node:16

WORKDIR /app

COPY package*.json .
RUN npm install -g pnpm@latest
RUN pnpm i

COPY . .

CMD ["pnpm","run","dev"]
