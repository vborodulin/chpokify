ARG CI_COMMIT_BRANCH=latest
FROM registry.gitlab.com/chpokify/main/deps:${CI_COMMIT_BRANCH} as deps
FROM node:16-alpine3.11

# create app directory
WORKDIR /home

# copy content
COPY . .

# copy node_modules
COPY --from=deps /home/node_modules node_modules
COPY --from=deps /home/frontend/node_modules frontend/node_modules

COPY --from=deps /home/packages/helpers/node_modules packages/helpers/node_modules
COPY --from=deps /home/packages/models-types/node_modules packages/models-types/node_modules

RUN yarn storybook:build

# run app
CMD npx http-server ./frontend/storybook-static
