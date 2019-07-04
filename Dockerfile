FROM node:alpine AS builder
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . .
RUN yarn build

FROM node:alpine
COPY --from=builder /usr/src/app/build ./
RUN yarn global add serve
CMD serve -l tcp://0.0.0.0:$PORT
