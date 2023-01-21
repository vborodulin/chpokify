FROM node:16-alpine3.11
RUN apk add g++ make py3-pip
RUN apk add --no-cache git openssh

# Create app directory
WORKDIR /home

# copy content
COPY package.json .

COPY server/package.json server/

COPY frontend/package.json frontend/

COPY packages/api-schemas/package.json packages/api-schemas/
COPY packages/helpers/package.json packages/helpers/
COPY packages/i18n/package.json packages/i18n/
COPY packages/models-types/package.json packages/models-types/
COPY packages/routing/package.json packages/routing/

# install dependencies
RUN yarn install || yarn install || yarn install
