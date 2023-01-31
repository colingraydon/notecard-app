import express from "express";
import { dataSource } from "./data-source";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { TestResolver } from "./resolvers/test";

const main = async () => {
  await dataSource.initialize();

  const app = express();

  app.get("/", (_, res) => {
    res.send("API working");
  });

  app.listen(4000, () => {
    console.log("Listening on port 4000");
  });

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TestResolver],
      validate: false,
    }),
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({ app });
};

main().catch((err) => {
  console.log(err);
});
