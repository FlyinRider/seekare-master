# FROM node:16 as builder
# WORKDIR /usr/src/
# COPY package*.json ./
# RUN npm install --legacy-peer-deps
# COPY . .
# RUN npm run build

FROM nginx
WORKDIR /var/www/html/
VOLUME [ "/var/www/html" ]
# COPY --from=builder /usr/src/build .
#COPY ./build .
COPY ./nginx/nginx-w-ssl.conf /etc/nginx/nginx.conf

RUN cat /etc/nginx/nginx.conf