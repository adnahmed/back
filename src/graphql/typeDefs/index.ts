import { typeDefs as scalarTypeDefs } from 'graphql-scalars'
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';

export default [
    loadFilesSync(path.join(__dirname, './**/*.graphql')),
    ...scalarTypeDefs,
]