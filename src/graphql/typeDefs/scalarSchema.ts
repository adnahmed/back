import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import { buildSchema, GraphQLSchema } from 'graphql';
const scalarSchema: GraphQLSchema = buildSchema(scalarTypeDefs.join(' '))
export default scalarSchema;