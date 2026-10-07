# AI-assisted by Claude Sonnet 5.5 (GitHub Copilot): updated the Node version and env variable name for the Vite migration.
FROM node:24-alpine as build-stage

WORKDIR /usr/src/app

ENV VITE_BACKEND_URL_PROD=https://tourneystreams.onrender.com/api

COPY . .

RUN npm ci

RUN npm run build

FROM node:24-alpine

COPY --from=build-stage /usr/src/app/build /usr/src/app/build