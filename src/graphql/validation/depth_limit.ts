import depthLimit from 'graphql-depth-limit'
import logger from '../../logger'

export default depthLimit(
    10,
    {}, // ignore no fields
    (depth) => {
        if (depth >= 10) logger.warn(`Depth Limit Exceeded: ${depth}`)
    }
)
