import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NormalizedCacheObject } from "apollo-boost";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: process.env.REACT_APP_BASEURL,
})