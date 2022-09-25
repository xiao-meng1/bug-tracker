FROM node:18

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npm i -g prisma
RUN prisma generate

ENV PORT=5000
EXPOSE 5000

CMD [ "npm", "start" ]