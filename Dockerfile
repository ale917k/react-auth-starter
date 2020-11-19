FROM node:latest

WORKDIR /usr/src/auth-starter-server

COPY ./ ./

RUN npm install

CMD ["sh"]