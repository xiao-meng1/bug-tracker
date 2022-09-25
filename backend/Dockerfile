# syntax = docker/dockerfile:1.2

FROM node:18

RUN  --mount=type=secret,id=DB,dst=/etc/secrets/DB

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm i -g prisma
RUN npx prisma migrate deploy

ENV PORT=5000
EXPOSE 5000

CMD [ "npm", "start" ]