import { shield } from 'graphql-shield'
import { createError } from 'http-errors'
import { isAuthenticated } from './auth_rules'

const permissions = shield({
    Query: {
    },
    Mutation: {
    },
}, {
    fallbackError: new createError(401, "Unauthorized.")
})

export default permissions;