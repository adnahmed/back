import { shield } from 'graphql-shield'
import createHttpError, { CreateHttpError } from 'http-errors'
import { isAuthenticated } from './auth_rules'

const permissions = shield({
    Query: {
    },
    Mutation: {
    },
}, {
    fallbackError: createHttpError(401, "Unauthorized.")
})

export default permissions;