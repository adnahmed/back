import { KeyvAdapter } from '@apollo/utils.keyvadapter'
import KeyvRedis from '@keyv/redis'
import Keyv from 'keyv'
import redis_client from './redis'
import logger from '../logger'

const keyvRedis = new KeyvRedis(redis_client)
const cache = new Keyv({ store: keyvRedis })
cache.on('error', handleRedisConnection)
function handleRedisConnection(error) {
    logger.error(error.message)
}

export default new KeyvAdapter(cache);