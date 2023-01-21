FROM node:16-alpine3.11

# Create app directory
WORKDIR /home

# copy content
COPY /migrations .

# install dependencies
RUN yarn global add migrate-mongo
RUN yarn install

CMD  migrate-mongo up
