import { ApolloServer } from 'apollo-server-express'
import cache from '../cache'
import context from './context'
import validation_rules from './validation'
import schema from './schema'

export default new ApolloServer({
    schema: schema,
    csrfPrevention: true,
    cache: cache,
    context: context,
    validationRules: validation_rules,
})