FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

RUN npm i -g prisma
RUN npx prisma migrate deploy

ENV PORT=5000
EXPOSE 5000

CMD [ "npm", "start" ]