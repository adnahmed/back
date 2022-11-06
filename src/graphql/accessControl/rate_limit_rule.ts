import { createRateLimitRule, RedisStore } from 'graphql-rate-limit'
import redis from '../../cache/redis'

export default createRateLimitRule({
    identifyContext: (ctx) => {
        if(ctx.user) return ctx.user.id;
        return ctx.req.ip;
    },
    store: new RedisStore(redis),
})