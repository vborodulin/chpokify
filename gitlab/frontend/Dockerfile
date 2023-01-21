ARG CI_COMMIT_BRANCH=latest

FROM registry.gitlab.com/chpokify/main/deps:${CI_COMMIT_BRANCH} as deps
FROM node:16-alpine3.11

ENV BASE_API_SSR_URL=http://server:8083
ENV APP_COOKIE_SESSION_NAME=chpokify-sid
ENV APP_HOST_PROD=chpokify.com
ENV CLIENT_SENTRY_DSN=https://188f27902b6149d887075c376829d4b5@o466468.ingest.sentry.io/5480810

# create app directory
WORKDIR /home

# copy content
COPY . .

# copy node_modules
COPY --from=deps /home/node_modules node_modules
COPY --from=deps /home/frontend/node_modules frontend/node_modules

COPY --from=deps /home/packages/helpers/node_modules packages/helpers/node_modules
COPY --from=deps /home/packages/models-types/node_modules packages/models-types/node_modules

# build frontend
RUN yarn config set unsafe-perm true
RUN yarn client:build

# run app
CMD yarn client:start
