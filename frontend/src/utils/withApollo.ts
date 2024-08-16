import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";

const client = new ApolloClient({
  credentials: "include",
  uri: "http://simplifystudying.com:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});

export const withApollo = createWithApollo(client);
