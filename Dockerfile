#Stage 1 - ng build
FROM node:10.15.3-alpine as node

WORKDIR /app
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build -- --aot --prod --output-path dist/




# Stage 2 - Runtime
FROM nginx:1.15.9-alpine
COPY --from=node /app/dist/ /usr/share/nginx/html

