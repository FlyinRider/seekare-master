# FROM node:10 as builder
# WORKDIR /usr/src/
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

FROM nginx
WORKDIR /usr/share/nginx/html/

# COPY --from=builder /usr/src/build .
COPY ./build .
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN cat /etc/nginx/nginx.conf 