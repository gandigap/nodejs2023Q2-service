FROM node:18-alpine

WORKDIR /app

COPY *.json ./

RUN npm ci && npm cache clean --force

RUN npm install

COPY . .

EXPOSE ${PORT}

CMD ["npm", "run", "start:dev"]