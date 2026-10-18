FROM node:22-alpine AS build-stage
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build -- --configuration production

FROM nginx:alpine
COPY --from=build-stage /app/dist/adventure-bookstore/browser/ /usr/share/nginx/html
COPY ./docker-conf/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
