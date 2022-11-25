import { DocumentNode } from "graphql";

declare module '*.graphql' {
    export const value: DocumentNode;
}