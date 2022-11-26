import { ApolloServer } from "@apollo/server";
import resolvers from "./resolvers";
import validation_rules from "./validation_rules";
import typeDefs from "./typeDefs";
import Context from './context'
// import cache from "./cache";
import env from "../env";
import {
    ApolloServerPluginLandingPageLocalDefault,
    ApolloServerPluginLandingPageProductionDefault
} from "@apollo/server/plugin/landingPage/default";

const graphql = new ApolloServer<Context>({
    typeDefs: typeDefs as string[],
    resolvers,
    csrfPrevention: true,
    introspection: true,
    // cache: cache,
    validationRules: validation_rules,
    plugins: [
        (env.APP_ENV === "local" ? ApolloServerPluginLandingPageLocalDefault() : ApolloServerPluginLandingPageProductionDefault())
    ]
});

export default graphql;