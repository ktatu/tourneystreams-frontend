FROM node:18.16.1-alpine as build-stage

WORKDIR /usr/src/app

ENV REACT_APP_BACKEND_URL_PROD=https://tourneystreams.onrender.com/api

COPY . .

RUN npm ci

RUN npm run build

FROM node:18.16.1-alpine

COPY --from=build-stage /usr/src/app/build /usr/src/app/build