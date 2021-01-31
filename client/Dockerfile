# Stage 1
FROM node:15.6.0-alpine3.10 as react-build

WORKDIR /app/client/

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.19.6

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=react-build /app/client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]