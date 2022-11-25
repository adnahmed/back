import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import cache from '../cache'
import validation_rules from './validation'
import schema from './schema'

export default new ApolloServer({
    schema: schema,
    csrfPrevention: true,
    introspection: true,
    cache: cache,
    validationRules: validation_rules,
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
})