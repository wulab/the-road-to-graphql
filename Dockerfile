FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE $PORT
CMD /bin/sh -c 'sed -i -E "s/listen( +)80;/listen\1$PORT;/g" /etc/nginx/conf.d/default.conf; exec nginx -g "daemon off;"'
