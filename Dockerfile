FROM node:18.16.0-alpine3.18

WORKDIR /app

COPY *.json ./

RUN npm ci && npm cache clean --force

RUN npm install

COPY . .

CMD ["npm", "run", "start"]