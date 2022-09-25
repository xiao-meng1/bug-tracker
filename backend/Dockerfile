# syntax = docker/dockerfile:1.2

FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN  --mount=type=secret,id=DATABASE_URI,dst=/etc/secrets/DATABASE_URI

RUN npm i -g prisma
RUN npx prisma migrate deploy

ENV PORT=5000
EXPOSE 5000

CMD [ "npm", "start" ]