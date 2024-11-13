import profilingclient from "#/graphql/apollo/profiling/profiling-apollo-server";
import { apolloDevToolsInit } from "react-native-apollo-devtools-client";

if (__DEV__) {
  apolloDevToolsInit(profilingclient)
}
