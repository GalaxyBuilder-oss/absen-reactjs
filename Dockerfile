FROM node:18.12

WORKDIR /app

COPY package*.json .
RUN npm install

COPY . .

RUN npm vite build

RUN npm vite preview

CMD ["pnpm","run","dev"]
