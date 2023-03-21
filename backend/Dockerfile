# FROM node:16

# # Create app directory
# WORKDIR /usr/src/app

# # Install app dependencies
# # A wildcard is used to ensure both package.json AND package-lock.json are copied
# # where available (npm@5+)
# COPY package.json ./

# COPY yarn.lock ./

# RUN yarn

# # Bundle app source
# COPY . .

# #copies .env.production and reads as .env
# COPY .env.production .env

# RUN yarn build

# ENV NODE_ENV production

# EXPOSE 4000

# CMD [ "node", "dist/index.js" ]

# USER node

FROM node:16-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

RUN yarn build

#added this
EXPOSE 4000

CMD ["node", "dist/index.js"]

#added this
USER node