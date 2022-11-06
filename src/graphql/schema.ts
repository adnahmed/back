import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import authPermissions from './accessControl/auth_permissions'
import rateLimitPermissions from './accessControl/rate_limit_permission'
import typeDefs from './typeDefs'
import resolvers from './resolvers'

export default applyMiddleware(
    makeExecutableSchema({ typeDefs, resolvers }),
    authPermissions,
    rateLimitPermissions
)