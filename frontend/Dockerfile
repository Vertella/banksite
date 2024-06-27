FROM node:alpine

ENV PORT 3001

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app

RUN npm install


COPY . /usr/src/app

CMD ["sh", "-c", "npm run build && npm start"]