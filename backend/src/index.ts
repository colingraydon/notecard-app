import express from "express";
import "dotenv/config";

import { dataSource } from "./data-source";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolvers/helloworld";
import { Context } from "./types";
import { UserResolver } from "./resolvers/user";
import connectRedis from "connect-redis";
import session from "express-session";
import Redis from "ioredis";
import { COOKIENAME, __prod__ } from "./constants";
//the plugin for playground which allows cookies, prod only
import { ApolloServerPluginLandingPageGraphQLPlayground } from "@apollo/server-plugin-landing-page-graphql-playground";
import { CardResolver } from "./resolvers/card";
import { SubjectResolver } from "./resolvers/subject";
import { NotificationResolver } from "./resolvers/notification";
import cors from "cors";

const main = async () => {
  // await dataSource.initialize();
  dataSource
    .initialize()
    .then(() => {
      console.log("initialized successfully");
    })
    .catch((err) => {
      console.log("data source initialization error occurred: ", err);
    });

  const app = express();

  app.get("/", (_, res) => {
    res.send("API working");
  });

  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );

  /**********redis middleware starts here. must be before the apollo middleware**/
  // redis@v4

  const RedisStore = connectRedis(session);

  //tossed in any typing as connect-redis @types were not up to date

  const redis: any = new Redis({ host: "redis", port: 6379 });
  // const redis: any = new Redis(process.env.REDIS_URL);
  // redis.connect().catch(console.error)

  //set proxy for nginx
  // app.set("proxy", 1);

  app.set("trust proxy", true);
  app.use(
    session({
      name: COOKIENAME,
      store: new RedisStore({
        client: redis,
        disableTouch: true, //optional arg, touching increases the time session will be active
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 60 * 364 * 10, //10 year cookie time
        httpOnly: true, //javascript code in front end cannot access cookie
        secure: false, //cookie only works in https if true. can set to __prod__ if in prod
        sameSite: "lax", //must be changed to lax for prod
        // domain: __prod__ ? ".simplifystudying.com" : undefined,
        domain: ".simplifystudying.com",
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );

  /*****redis middleware ends here*********/

  app.listen(4000, () => {
    console.log(`🚀 Listening on port 4000`);
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        TestResolver,
        UserResolver,
        CardResolver,
        SubjectResolver,
        NotificationResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }): Context => ({
      req,
      res,
      redis,
    }),
    cache: "bounded",
    //only for prod
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
  });

  await apolloServer.start();

  //********* */
  apolloServer.applyMiddleware({
    app,
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    },
  });

  //****** for dev only */
  //apolloServer.applyMiddleware({ app });
};

main().catch((err) => {
  console.log(err);
});
