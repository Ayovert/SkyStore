import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

export const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  cache: new InMemoryCache({}),
  uri: process.env.REACT_APP_BASEURL,
})