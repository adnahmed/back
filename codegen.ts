
import type { CodegenConfig } from '@graphql-codegen/cli';
const config: CodegenConfig = {
  overwrite: true,
  schema: ["./src/graphql/typeDefs/**/*.graphql", "./src/graphql/typeDefs/scalarSchema.ts"],
  generates: {
    "src/graphql/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers"]
    }
  }
};

export default config;
