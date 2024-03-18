FROM node:20.11.1

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV PORT=3000

CMD npm run start:dev
