import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";

const client = new ApolloClient({
  credentials: "include",
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          //   posts: {
          //     //specify which args are importnat, can also pass in "limit" here
          //     keyArgs: [],
          //     merge(
          //       existing: PaginatedPosts | undefined,
          //       incoming: PaginatedPosts
          //     ): PaginatedPosts {
          //       return {
          //         ...incoming,
          //         posts: [...(existing?.posts || []), ...incoming.posts],
          //       };
          //     },
          //   },
        },
      },
    },
  }),
});

export const withApollo = createWithApollo(client);
