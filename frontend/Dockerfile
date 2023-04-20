FROM node:16-alpine

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

COPY .env.local .env

RUN yarn build

ENV NODE_ENV production

ENV NEXT_PUBLIC_API_URL http://52.91.195.68:4000/graphql

EXPOSE 3000

CMD [ "yarn", "start" ]

USER node
