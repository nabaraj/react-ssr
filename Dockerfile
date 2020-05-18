# Stage 1 - the build process
FROM node:alpine as build-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
RUN npm run build:prod

# Stage 2 - the production environment
FROM nginx:1.12-alpine
COPY nginx.config /etc/nginx/conf.d/default.conf
COPY --from=build-deps /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]