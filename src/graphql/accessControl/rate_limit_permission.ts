import rateLimitRule from './rate_limit_rule'
import { shield } from 'graphql-shield'

export default shield({
    Mutation: {
        register: rateLimitRule({window: '1s', max: 2}),
        unregister: rateLimitRule({window: '1s', max: 2}),
    },
})