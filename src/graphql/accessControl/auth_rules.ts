import { rule } from 'graphql-shield'

// Rules
export const isAuthenticated = rule({ cache: 'contextual' })(
    async (parent, args, ctx, info) => {
        return ctx.user !== null
    },
)
