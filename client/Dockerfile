FROM node:14.18-slim as builder

WORKDIR /app

COPY ./package.json ./

RUN npm install --save --legacy-peer-deps

COPY ./ ./

ENV NODE_ENV production

RUN npm run build


FROM nginx:1.21.3-alpine

EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html