FROM node:16

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

COPY .env.local .env

RUN yarn build

ENV NODE_ENV production

EXPOSE 3000

CMD [ "yarn", "start" ]

USER node
