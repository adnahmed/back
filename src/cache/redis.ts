import Redis from 'ioredis'
import logger from '../logger'
import env from "../../env"

const port = env.REDIS_PORT || 6379
const host = env.REDIS_HOST || "localhost"
const retry = env.REDIS_MAX_CONNECTION_RETRY || 10
const reconnect = env.REDIS_RECONNECT_TIME || 3000
            
const redis_client = new Redis(port, host, {
    username: env.REDIS_USERNAME,
    password: env.REDIS_PASSWORD,
    db: env.REDIS_DB,
    retryStrategy: (times) => {
        if (times > retry) {
           return null; 
        }
        logger.warn('Retrying Redis Connection ... Retry#' + times)
        return Math.min(
            times * 100,
            reconnect
        )
    },
})
redis_client.on('ready', () => {
    logger.info('Redis Client Connected.')
})
redis_client.on('error', (err) => {
    logger.error(err.message)
})
export default redis_client;