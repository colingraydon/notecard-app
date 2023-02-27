# notecard-app

This is an open source website intended to help students and professionals study material. It will allow you to create and study notecards, classified by subject.

This app uses Postgres, Apollo, Express, Redis, TypeORM, and typegraphql on the backend, with Next.JS, React, Chakra, and GraphQL on the frontend. To run it, type

yarn

in the root directory, and open a port to localhost:3000 to access the frontend. The Apollo sandbox can be accessed at localhost:4000/graphql. You will also need to create a postgres DB and pass the name to backend/src/data-source.ts

Other scripts are available in the package.json. Yarn dev will work for both the backend and frontend.
