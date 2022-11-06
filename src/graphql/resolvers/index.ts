import { loadFilesSync } from '@graphql-tools/load-files'
import { mergeResolvers } from '@graphql-tools/merge'
import { resolvers as scalarResolvers } from 'graphql-scalars'
import path from 'path'

export default {
    ...scalarResolvers,
    ...mergeResolvers(
        loadFilesSync(path.join(__dirname, './**/*.ts'))
    ),
}