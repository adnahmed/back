// import { typeDefs as scalarTypeDefs } from "graphql-scalars";
import scalarSchema from "./scalarSchema";
import fs from 'fs'
import path from 'path'
import { GraphQLSchema } from 'graphql';

function LoadFilesSync(dirPath, extension = '.graphql'): string[] {
  const dirs = [dirPath];
  const result: string[] = [];
  for (const dir of dirs) {               // Directory Loop
    const files = fs.readdirSync(dir)
    for (const file of files) {
      try {
        const data = fs.readFileSync(path.resolve(dir, file))  // Try reading file
        if (file.endsWith(extension))
          result.push(data.toString())
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes("EISDIR")) {
            // Found a directory, traversing it recursively
            dirs.push(path.resolve(dir, file))
          }
        }
      }
    }
  }
  return result;
}

const schema = [
  ...LoadFilesSync('./src/graphql/typeDefs/'),
    scalarSchema
];

export default schema;