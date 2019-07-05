FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
